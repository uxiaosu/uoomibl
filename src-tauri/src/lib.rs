// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[cfg(debug_assertions)]
use log::{debug, error, info, warn};
use serde::{Deserialize, Serialize};
use std::fmt;
use tauri::Manager;

// 自定义错误类型
#[derive(Debug, Deserialize, Serialize)]
pub enum AppError {
    GeneralError(String),
    ValidationError(String),
    IOError(String),
    NetworkError(String),
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            AppError::GeneralError(msg) => write!(f, "一般错误: {}", msg),
            AppError::ValidationError(msg) => write!(f, "验证错误: {}", msg),
            AppError::IOError(msg) => write!(f, "IO错误: {}", msg),
            AppError::NetworkError(msg) => write!(f, "网络错误: {}", msg),
        }
    }
}

impl From<std::io::Error> for AppError {
    fn from(err: std::io::Error) -> Self {
        AppError::IOError(err.to_string())
    }
}

// 结果类型别名
type AppResult<T> = Result<T, AppError>;

// 改进的问候函数，带错误处理
#[tauri::command]
fn greet(name: &str) -> AppResult<String> {
    // 参数验证
    if name.trim().is_empty() {
        error!("无效的名称参数: 空字符串");
        return Err(AppError::ValidationError("名称不能为空".into()));
    }
    
    if name.len() > 100 {
        warn!("名称参数过长: {} 字符", name.len());
        return Err(AppError::ValidationError("名称长度不能超过100个字符".into()));
    }
    
    info!("问候: {}", name);
    Ok(format!("你好, {}! 来自Rust的问候!", name))
}

// 获取应用信息
#[tauri::command]
fn get_app_info() -> AppResult<serde_json::Value> {
    info!("获取应用信息");
    
    // 创建返回对象
    let info = serde_json::json!({
        "version": env!("CARGO_PKG_VERSION"),
        "name": env!("CARGO_PKG_NAME"),
        "authors": env!("CARGO_PKG_AUTHORS"),
        "description": env!("CARGO_PKG_DESCRIPTION"),
        "system_info": {
            "os": std::env::consts::OS,
            "arch": std::env::consts::ARCH,
            "cpu_count": num_cpus::get(),
        },
        "timestamp": chrono::Local::now().to_rfc3339(),
    });
    
    Ok(info)
}

// 写入日志
#[tauri::command]
fn log_to_file(level: &str, message: &str) -> AppResult<()> {
    let level = level.to_lowercase();
    
    match level.as_str() {
        "debug" => debug!("{}", message),
        "info" => info!("{}", message),
        "warn" => warn!("{}", message),
        "error" => error!("{}", message),
        _ => warn!("未知日志级别: {}, 消息: {}", level, message),
    }
    
    Ok(())
}

// 配置日志
fn setup_logging() -> Result<(), fern::InitError> {
    let log_file = if cfg!(debug_assertions) {
        // 开发模式
        fern::log_file("uoomibl-dev.log")?
    } else {
        // 生产模式 - 使用系统日志路径
        let path = if let Some(proj_dirs) = directories::ProjectDirs::from("com", "uoomibl", "app") {
            let log_dir = proj_dirs.data_dir();
            std::fs::create_dir_all(log_dir)?;
            log_dir.join("app.log")
        } else {
            std::path::PathBuf::from("uoomibl.log")
        };
        
        fern::log_file(path)?
    };
    
    // 配置日志
    fern::Dispatch::new()
        .format(|out, message, record| {
            out.finish(format_args!(
                "{}[{}][{}] {}",
                chrono::Local::now().format("[%Y-%m-%d][%H:%M:%S]"),
                record.level(),
                record.target(),
                message
            ))
        })
        .level(if cfg!(debug_assertions) {
            log::LevelFilter::Debug
        } else {
            log::LevelFilter::Info
        })
        .chain(std::io::stdout())
        .chain(log_file)
        .apply()?;
    
    info!("日志系统初始化完成");
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // 初始化日志
    if let Err(e) = setup_logging() {
        eprintln!("日志初始化失败: {}", e);
    }
    
    info!("应用启动");
    
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            get_app_info,
            log_to_file
        ])
        .setup(|app| {
            info!("Tauri应用设置");
            
            // 应用设置
            #[cfg(debug_assertions)]
            {
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
                debug!("已打开DevTools");
            }
            
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("Tauri应用运行错误");
}
