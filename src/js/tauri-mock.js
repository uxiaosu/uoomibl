// 模拟Tauri API
// 错误类型枚举
const ErrorType = {
  GENERAL: 'GeneralError',
  VALIDATION: 'ValidationError',
  IO: 'IOError',
  NETWORK: 'NetworkError'
};

// 记录调用历史，方便调试
const apiCallHistory = [];

// 模拟API调用
export async function invoke(command, args) {
  console.log('Tauri调用:', command, args);
  
  try {
    // 记录调用
    apiCallHistory.push({
      timestamp: new Date(),
      command,
      args,
    });
    
    // 根据命令处理不同的API
    switch (command) {
      case 'greet':
        return handleGreet(args);
      
      case 'get_app_info':
        return handleGetAppInfo();
      
      case 'log_to_file':
        return handleLogToFile(args);
      
      default:
        console.warn(`未实现的API: ${command}`);
        throw createError(
          ErrorType.GENERAL,
          `未实现的API: ${command}`
        );
    }
  } catch (error) {
    console.error('Tauri API调用失败:', error);
    // 如果已经是自定义错误，则直接抛出
    if (error.type) {
      throw error;
    }
    // 否则包装成一般错误
    throw createError(
      ErrorType.GENERAL,
      `API调用失败: ${error.message}`
    );
  }
}

// 创建自定义错误
function createError(type, message) {
  return {
    type,
    message,
    toString() {
      return `${type}: ${message}`;
    }
  };
}

// 处理问候命令
function handleGreet(args) {
  const { name } = args || {};
  
  // 参数验证
  if (!name || name.trim() === '') {
    throw createError(
      ErrorType.VALIDATION,
      '名称不能为空'
    );
  }
  
  if (name.length > 100) {
    throw createError(
      ErrorType.VALIDATION,
      '名称长度不能超过100个字符'
    );
  }
  
  return Promise.resolve(`你好，${name}! (模拟响应)`);
}

// 处理获取应用信息命令
function handleGetAppInfo() {
  return Promise.resolve({
    version: '0.1.0',
    name: 'uoomibl',
    authors: 'SimpleJS Team',
    description: 'A Tauri App',
    system_info: {
      os: navigator.platform,
      arch: navigator.userAgent,
      cpu_count: navigator.hardwareConcurrency || 4,
    },
    timestamp: new Date().toISOString(),
  });
}

// 处理日志写入命令
function handleLogToFile(args) {
  const { level, message } = args || {};
  
  if (!level || !message) {
    throw createError(
      ErrorType.VALIDATION,
      '日志级别和消息不能为空'
    );
  }
  
  console.log(`[${level.toUpperCase()}] ${message}`);
  return Promise.resolve();
}

// 导出模拟函数
export function getMockCallHistory() {
  return [...apiCallHistory];
}

// 导出其他工具函数
export function clearMockHistory() {
  apiCallHistory.length = 0;
  return true;
} 