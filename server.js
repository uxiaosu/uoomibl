import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';

// 获取__dirname（ESM中不直接提供）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建Express应用
const app = express();
const PORT = 1420;

// 创建livereload服务器用于热重载（使用自定义端口）
const liveReloadServer = livereload.createServer({
  exts: ['html', 'css', 'js', 'png', 'jpg', 'gif'],
  debug: true,
  port: 35730 // 使用不同的端口避免冲突
});

// 监视除src-tauri外的所有文件
liveReloadServer.watch([
  path.join(__dirname, 'src'),
  path.join(__dirname, 'public'),
  path.join(__dirname, 'index.html')
]);

// 注入livereload脚本
app.use(connectLivereload({
  port: 35730 // 确保connectLivereload使用相同的端口
}));

// 静态文件服务 - 添加显式的node_modules路由
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// 静态文件服务
app.use(express.static(__dirname));

// 用于调试的路由
app.get('/api/debug', (req, res) => {
  res.json({
    status: 'ok',
    nodeModulesPath: path.join(__dirname, 'node_modules'),
    exists: {
      tauriApi: require('fs').existsSync(path.join(__dirname, 'node_modules/@tauri-apps/api')),
      tauriWindow: require('fs').existsSync(path.join(__dirname, 'node_modules/@tauri-apps/api/window.js')),
      tauriCore: require('fs').existsSync(path.join(__dirname, 'node_modules/@tauri-apps/api/tauri.js'))
    }
  });
});

// 所有路由都返回index.html（支持SPA）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器正在运行 http://localhost:${PORT}`);
  console.log(`node_modules路径: ${path.join(__dirname, 'node_modules')}`);
  console.log(`@tauri-apps/api路径: ${path.join(__dirname, 'node_modules/@tauri-apps/api')}`);
}); 