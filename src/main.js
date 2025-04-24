// SimpleJS 应用入口
import { element } from './dna/element.js';
import { createComponent, mount } from './dna/component.js';
import { appWindow } from "@tauri-apps/api/window";
// 引入错误处理工具
import { registerGlobalErrorHandlers, showInfo } from './utils/ErrorHandler.js';
import { logToBackend } from './js/ApiErrorHandler.js';

// 应用主组件
const App = createComponent({
  node: {
    container: element('div', { class: 'app-container' }),
    titlebar: element('div', { class: 'titlebar' }),
    titlebarTitle: element('h1', { class: 'titlebar-title' }, 'SimpleJS Tauri 应用'),
    windowControls: element('div', { class: 'window-controls' }),
    closeButton: element('div', { class: 'window-control-button window-control-close' }),
    minimizeButton: element('div', { class: 'window-control-button window-control-minimize' }),
    maximizeButton: element('div', { class: 'window-control-button window-control-maximize' }),
    mainContent: element('main', { class: 'main-content' }),
    welcomeMessage: element('div', { class: 'welcome-message' }),
    welcomeTitle: element('h1', {}, '欢迎使用 SimpleJS Tauri'),
    welcomeDesc: element('p', {}, '这是一个干净的应用模板，已删除所有示例页面。')
  },
  
  action: {
    onCreate() {
      try {
        // 窗口控制
        this.node.closeButton.addEventListener('click', () => appWindow.close());
        this.node.minimizeButton.addEventListener('click', () => appWindow.minimize());
        this.node.maximizeButton.addEventListener('click', async () => {
          const isMaximized = await appWindow.isMaximized();
          if (isMaximized) {
            appWindow.unmaximize();
          } else {
            appWindow.maximize();
          }
        });
        
        // 构建标题栏
        this.node.windowControls.append(
          this.node.minimizeButton,
          this.node.maximizeButton,
          this.node.closeButton
        );
        
        this.node.titlebar.append(
          this.node.titlebarTitle,
          this.node.windowControls
        );
        
        // 构建欢迎信息
        this.node.welcomeMessage.append(
          this.node.welcomeTitle,
          this.node.welcomeDesc
        );
        
        // 构建主内容
        this.node.mainContent.append(
          this.node.welcomeMessage
        );
        
        // 构建DOM结构
        this.node.container.append(
          this.node.titlebar,
          this.node.mainContent
        );
        
        // 记录应用加载完成
        logToBackend('info', '应用界面已加载完成');
      } catch (error) {
        console.error('应用初始化错误:', error);
        logToBackend('error', `应用初始化错误: ${error.message}`);
      }
    }
  }
});

// 在DOM加载后挂载应用
window.addEventListener("DOMContentLoaded", () => {
  // 注册全局错误处理
  registerGlobalErrorHandlers();
  
  // 显示应用启动信息
  showInfo('应用已启动', '初始化中...');
  
  const appContainer = document.getElementById('app');
  if (appContainer) {
    mount(App, appContainer);
  } else {
    // 如果找不到容器，创建一个
    const container = document.createElement('div');
    container.id = 'app';
    document.body.appendChild(container);
    mount(App, container);
  }
});