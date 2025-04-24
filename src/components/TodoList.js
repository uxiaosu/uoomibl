// SimpleJS 待办事项组件
import { signal, flow } from '../signals/index.js';
import { element } from '../dna/element.js';
import { createComponent } from '../dna/component.js';
import { showError, showWarning } from '../utils/ErrorHandler.js';

// 辅助函数 - 位于组件外部
function renderTodoItems(component, todos) {
  try {
    // 参数验证
    if (!Array.isArray(todos)) {
      showError('渲染待办事项列表失败', '传入的待办事项不是数组');
      todos = [];
    }
    
    const node = component.node;
    if (!node || !node.todoList) {
      showError('渲染待办事项列表失败', '无法访问todoList节点');
      return;
    }
    
    // 清空列表
    node.todoList.innerHTML = '';
    
    if (todos.length === 0) {
      const emptyMessage = element('li', { class: 'empty-message' }, '没有待办事项');
      node.todoList.appendChild(emptyMessage);
      return;
    }
    
    // 添加每个待办事项
    todos.forEach(todo => {
      try {
        if (!todo || typeof todo !== 'object') {
          showWarning('跳过无效的待办事项', String(todo));
          return;
        }
        
        const li = element('li', { 
          class: `todo-item ${todo.completed ? 'completed' : ''}`
        });
        
        const checkbox = element('input', { 
          type: 'checkbox',
          class: 'todo-checkbox',
          checked: todo.completed
        });
        
        const label = element('label', { class: 'todo-text' }, todo.text || '无内容');
        
        const deleteBtn = element('button', { 
          class: 'todo-delete-btn'
        }, '删除');
        
        // 添加事件监听
        checkbox.addEventListener('change', () => {
          component.data.toggleTodo(todo.id);
        });
        
        deleteBtn.addEventListener('click', () => {
          component.data.removeTodo(todo.id);
        });
        
        // 组装列表项
        li.append(checkbox, label, deleteBtn);
        node.todoList.appendChild(li);
      } catch (error) {
        showError('渲染待办事项失败', `ID: ${todo?.id}, 错误: ${error.message}`);
      }
    });
  } catch (error) {
    showError('渲染待办事项列表失败', error.stack);
    
    // 保障UI可用
    if (component.node && component.node.todoList) {
      component.node.todoList.innerHTML = '';
      const errorMessage = element('li', { class: 'error-message' }, '渲染列表时发生错误');
      component.node.todoList.appendChild(errorMessage);
    }
  }
}

// 待办事项组件
export const TodoList = createComponent({
  data: {
    todos: signal([
      { id: 1, text: '学习 SimpleJS', completed: false },
      { id: 2, text: '创建 Tauri 应用', completed: true },
      { id: 3, text: '构建跨平台应用', completed: false }
    ]),
    newTodoText: signal(''),
    filter: signal('all'), // 'all', 'active', 'completed'
    
    // 计算属性：过滤后的待办事项
    filteredTodos: null, // 在onCreate中初始化
    
    // 添加新待办
    addTodo() {
      try {
        const text = this.newTodoText.value.trim();
        if (!text) {
          showWarning('无法添加空待办事项', '请输入待办事项内容');
          return;
        }
        
        const newTodo = {
          id: Date.now(),
          text,
          completed: false
        };
        
        this.todos.update(todos => [...todos, newTodo]);
        this.newTodoText.set('');
      } catch (error) {
        showError('添加待办事项失败', error.stack);
      }
    },
    
    // 删除待办
    removeTodo(id) {
      try {
        if (id === undefined || id === null) {
          showError('删除待办事项失败', '无效的待办事项ID');
          return;
        }
        
        this.todos.update(todos => todos.filter(todo => todo.id !== id));
      } catch (error) {
        showError('删除待办事项失败', error.stack);
      }
    },
    
    // 切换待办状态
    toggleTodo(id) {
      try {
        if (id === undefined || id === null) {
          showError('切换待办事项状态失败', '无效的待办事项ID');
          return;
        }
        
        this.todos.update(todos => 
          todos.map(todo => 
            todo.id === id 
              ? { ...todo, completed: !todo.completed } 
              : todo
          )
        );
      } catch (error) {
        showError('切换待办事项状态失败', error.stack);
      }
    },
    
    // 清除已完成
    clearCompleted() {
      try {
        const todos = this.todos.value;
        const hasCompleted = todos.some(todo => todo.completed);
        
        if (!hasCompleted) {
          showWarning('没有已完成的待办事项可清除');
          return;
        }
        
        this.todos.update(todos => todos.filter(todo => !todo.completed));
      } catch (error) {
        showError('清除已完成待办事项失败', error.stack);
      }
    },
    
    // 设置过滤器
    setFilter(filter) {
      try {
        if (!['all', 'active', 'completed'].includes(filter)) {
          showWarning('过滤器类型无效', `"${filter}"不是有效的过滤类型，已使用"all"替代`);
          filter = 'all';
        }
        
        this.filter.set(filter);
      } catch (error) {
        showError('设置过滤器失败', error.stack);
      }
    },
    
    // 加载待办事项
    loadTodos() {
      try {
        // 模拟从本地存储加载
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
          const parsed = JSON.parse(savedTodos);
          if (Array.isArray(parsed)) {
            this.todos.set(parsed);
          }
        }
      } catch (error) {
        showError('加载待办事项失败', error.stack);
      }
    },
    
    // 保存待办事项
    saveTodos() {
      try {
        // 保存到本地存储
        localStorage.setItem('todos', JSON.stringify(this.todos.value));
      } catch (error) {
        showError('保存待办事项失败', error.stack);
      }
    }
  },
  
  node: {
    container: element('div', { class: 'todo-app' }),
    header: element('header', { class: 'todo-header' }),
    title: element('h2', {}, '待办事项'),
    form: element('form', { class: 'todo-form' }),
    input: element('input', { 
      class: 'todo-input',
      placeholder: '添加新的待办事项...'
    }),
    addButton: element('button', { 
      type: 'submit',
      class: 'todo-add-btn'
    }, '添加'),
    main: element('main', { class: 'todo-main' }),
    todoList: element('ul', { class: 'todo-list' }),
    filters: element('div', { class: 'todo-filters' }),
    allFilter: element('button', { 
      class: 'filter-btn filter-all active'
    }, '全部'),
    activeFilter: element('button', { 
      class: 'filter-btn filter-active'
    }, '未完成'),
    completedFilter: element('button', { 
      class: 'filter-btn filter-completed'
    }, '已完成'),
    footer: element('footer', { class: 'todo-footer' }),
    clearButton: element('button', { 
      class: 'clear-completed-btn'
    }, '清除已完成'),
    counter: element('span', { class: 'todo-count' })
  },
  
  action: {
    onCreate() {
      try {
        // 尝试加载保存的待办事项
        this.data.loadTodos();
        
        // 初始化计算属性
        this.data.filteredTodos = flow(this.data.todos)
          .filter(todos => {
            try {
              const filter = this.data.filter.value;
              if (filter === 'all') return true;
              if (filter === 'active') return !todos.completed;
              if (filter === 'completed') return todos.completed;
              return true;
            } catch (error) {
              showError('过滤待办事项失败', error.stack);
              return true; // 出错时显示所有
            }
          });
        
        // 表单提交处理
        this.node.form.addEventListener('submit', e => {
          e.preventDefault();
          this.data.addTodo();
        });
        
        // 输入框双向绑定
        this.node.input.addEventListener('input', e => {
          this.data.newTodoText.set(e.target.value);
        });
        
        this.watch(this.data.newTodoText, text => {
          this.node.input.value = text;
        });
        
        // 过滤器按钮点击事件
        this.node.allFilter.addEventListener('click', () => {
          this.data.setFilter('all');
          this.updateFilterButtons('all');
        });
        
        this.node.activeFilter.addEventListener('click', () => {
          this.data.setFilter('active');
          this.updateFilterButtons('active');
        });
        
        this.node.completedFilter.addEventListener('click', () => {
          this.data.setFilter('completed');
          this.updateFilterButtons('completed');
        });
        
        // 清除已完成按钮
        this.node.clearButton.addEventListener('click', () => {
          this.data.clearCompleted();
        });
        
        // 监听过滤后的待办事项变化
        this.watch(this.data.filteredTodos, todos => {
          try {
            // 使用辅助函数渲染列表
            renderTodoItems(this, todos);
          } catch (error) {
            showError('渲染待办事项列表失败', error.stack);
          }
        });
        
        // 监听待办事项总数变化
        this.watch(this.data.todos, todos => {
          try {
            const activeCount = todos.filter(todo => !todo.completed).length;
            this.node.counter.textContent = `${activeCount} 项未完成`;
            
            // 保存到本地存储
            this.data.saveTodos();
          } catch (error) {
            showError('更新待办事项计数失败', error.stack);
          }
        });
        
        // 构建DOM结构
        this.node.header.append(
          this.node.title
        );
        
        this.node.form.append(
          this.node.input,
          this.node.addButton
        );
        
        this.node.filters.append(
          this.node.allFilter,
          this.node.activeFilter,
          this.node.completedFilter
        );
        
        this.node.footer.append(
          this.node.counter,
          this.node.clearButton
        );
        
        this.node.main.append(
          this.node.todoList,
          this.node.filters
        );
        
        this.node.container.append(
          this.node.header,
          this.node.form,
          this.node.main,
          this.node.footer
        );
        
        // 初始渲染
        renderTodoItems(this, this.data.todos.value);
      } catch (error) {
        showError('初始化待办事项应用失败', error.stack);
      }
    },
    
    // 更新过滤器按钮状态
    updateFilterButtons(activeFilter) {
      try {
        this.node.allFilter.classList.toggle('active', activeFilter === 'all');
        this.node.activeFilter.classList.toggle('active', activeFilter === 'active');
        this.node.completedFilter.classList.toggle('active', activeFilter === 'completed');
      } catch (error) {
        showError('更新过滤器按钮状态失败', error.stack);
      }
    }
  }
});