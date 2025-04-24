// 问候组件
import { signal } from '../signals/index.js';
import { element } from '../dna/element.js';
import { createComponent } from '../dna/component.js';
import { invoke } from "@tauri-apps/api/tauri";
import { withErrorHandling } from '../js/ApiErrorHandler.js';
import { showInfo } from '../utils/ErrorHandler.js';

// 包装API调用以自动处理错误
const safeInvoke = withErrorHandling(invoke, '问候处理');

export const Greeter = createComponent({
  data: {
    name: signal(''),
    message: signal(''),
    loading: signal(false),
    error: signal(null),
    
    async greet() {
      if (!this.name.value) {
        this.error.set('请输入您的名字');
        return;
      }
      
      try {
        this.error.set(null);
        this.loading.set(true);
        
        // 使用包装后的安全调用
        const result = await safeInvoke("greet", {
          name: this.name.value,
        });
        
        this.message.set(result);
        showInfo('问候成功', `已向${this.name.value}发送问候`);
      } catch (error) {
        // 由于已经有自动错误处理，这里只需更新组件状态
        this.error.set(error.message || '未知错误');
        this.message.set('');
      } finally {
        this.loading.set(false);
      }
    },
    
    resetForm() {
      this.name.set('');
      this.message.set('');
      this.error.set(null);
    }
  },
  
  node: {
    container: element('div', { class: 'greeter' }),
    form: element('form', { class: 'greet-form' }),
    label: element('label', { for: 'name-input' }, '您的名字:'),
    input: element('input', { 
      id: 'name-input',
      placeholder: '请输入您的名字...',
      class: 'greet-input'
    }),
    button: element('button', { 
      type: 'submit',
      class: 'greet-button'
    }, '问候'),
    resetButton: element('button', {
      type: 'button',
      class: 'reset-button'
    }, '重置'),
    message: element('p', { class: 'greet-message' }),
    errorMessage: element('p', { class: 'error-message' })
  },
  
  action: {
    onCreate() {
      // 表单提交处理
      this.node.form.addEventListener('submit', e => {
        e.preventDefault();
        this.data.greet();
      });
      
      // 重置按钮
      this.node.resetButton.addEventListener('click', () => {
        this.data.resetForm();
      });
      
      // 输入框处理
      this.node.input.addEventListener('input', e => {
        this.data.name.set(e.target.value);
        // 当用户开始输入时清除错误
        if (this.data.error.value) {
          this.data.error.set(null);
        }
      });
      
      // 数据变化监听
      this.watch(this.data.name, name => {
        this.node.input.value = name;
      });
      
      this.watch(this.data.message, message => {
        this.node.message.textContent = message;
        // 当有消息时显示，否则隐藏
        this.node.message.style.display = message ? 'block' : 'none';
      });
      
      this.watch(this.data.error, error => {
        this.node.errorMessage.textContent = error || '';
        // 当有错误时显示，否则隐藏
        this.node.errorMessage.style.display = error ? 'block' : 'none';
        
        // 错误时添加错误样式，否则移除
        if (error) {
          this.node.input.classList.add('input-error');
        } else {
          this.node.input.classList.remove('input-error');
        }
      });
      
      this.watch(this.data.loading, loading => {
        this.node.button.disabled = loading;
        this.node.resetButton.disabled = loading;
        this.node.input.disabled = loading;
        this.node.button.textContent = loading ? '处理中...' : '问候';
      });
      
      // 构建DOM结构
      this.node.form.append(
        this.node.label,
        this.node.input,
        this.node.button,
        this.node.resetButton
      );
      
      this.node.container.append(
        this.node.form,
        this.node.errorMessage,
        this.node.message
      );
      
      // 初始状态
      this.node.message.style.display = 'none';
      this.node.errorMessage.style.display = 'none';
    }
  }
}); 