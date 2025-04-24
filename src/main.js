// SimpleJS 应用入口
import { signal } from './signals/index.js';
import { element } from './dna/element.js';
import { createComponent, mount } from './dna/component.js';
import { TodoList } from './components/TodoList.js';
import { Greeter } from './components/Greeter.js';
import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";
// 引入错误处理工具
import { registerGlobalErrorHandlers, showInfo } from './utils/ErrorHandler.js';
import { logToBackend } from './js/ApiErrorHandler.js';

// 创建一个简单的计数器组件
const Counter = createComponent({
  data: {
    count: signal(0),
    
    increment() {
      this.count.update(c => c + 1);
    },
    
    decrement() {
      this.count.update(c => Math.max(0, c - 1));
    }
  },
  
  node: {
    container: element('div', { class: 'counter' }),
    display: element('p', { class: 'display' }),
    decrementBtn: element('button', { class: 'btn-decrement' }, '减少'),
    incrementBtn: element('button', { class: 'btn-increment' }, '增加')
  },
  
  action: {
    onCreate() {
      // 监听数据变化
      this.watch(this.data.count, count => {
        this.node.display.textContent = `计数: ${count}`;
      });
      
      // 添加事件处理
      this.node.decrementBtn.addEventListener('click', () => {
        this.data.decrement();
      });
      
      this.node.incrementBtn.addEventListener('click', () => {
        this.data.increment();
      });
      
      // 构建DOM结构
      this.node.container.append(
        this.node.display,
        this.node.decrementBtn,
        this.node.incrementBtn
      );
    }
  }
});

// 应用主组件
const App = createComponent({
  node: {
    container: element('div', { class: 'app-container' }),
    titlebar: element('div', { class: 'titlebar' }),
    titlebarTitle: element('h1', { class: 'titlebar-title' }, 'SimpleJS Tauri 示例'),
    windowControls: element('div', { class: 'window-controls' }),
    closeButton: element('div', { class: 'window-control-button window-control-close' }),
    minimizeButton: element('div', { class: 'window-control-button window-control-minimize' }),
    maximizeButton: element('div', { class: 'window-control-button window-control-maximize' }),
    mainContent: element('main', { class: 'main-content' }),
    title: element('h1', {}, 'SimpleJS Tauri 示例'),
    description: element('p', {}, '这是一个使用SimpleJS框架构建的Tauri应用示例'),
    counterSection: element('section', { class: 'counter-section' }),
    counterTitle: element('h2', {}, '计数器示例'),
    greeterSection: element('section', { class: 'greeter-section' }),
    greeterTitle: element('h2', {}, '与Rust通信示例'),
    todoSection: element('section', { class: 'todo-section' }),
    todoTitle: element('h2', {}, '待办事项应用')
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
        
        // 构建DOM结构
        this.node.counterSection.append(
          this.node.counterTitle
        );
        
        this.node.greeterSection.append(
          this.node.greeterTitle
        );
        
        this.node.todoSection.append(
          this.node.todoTitle
        );
        
        this.node.mainContent.append(
          this.node.title,
          this.node.description,
          this.node.counterSection,
          this.node.greeterSection,
          this.node.todoSection
        );
        
        this.node.container.append(
          this.node.titlebar,
          this.node.mainContent
        );
        
        // 挂载子组件
        mount(Counter, this.node.counterSection);
        mount(Greeter, this.node.greeterSection);
        mount(TodoList, this.node.todoSection);
        
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
  showInfo('应用已启动', '正在初始化组件...');
  
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