# SimpleJS框架 | SimpleJS Framework

<p align="center">
  <b>语言 | Language:</b> 
  <a href="#中文文档">中文</a> | 
  <a href="#english-documentation">English</a>
</p>

<p align="center">用SimpleJS构建现代、高效、可维护的Web应用</p>
<p align="center">Build modern, efficient, and maintainable web applications with SimpleJS</p>

<a name="中文文档"></a>
## 中文文档

### 目录

- [简介](#简介)
- [核心优势](#核心优势)
- [技术规格](#技术规格)
- [现代框架技术基础](#现代框架技术基础)
- [渐进式学习路径](#渐进式学习路径)
- [封装格式](#封装格式)
- [跨框架兼容性](#跨框架兼容性)
- [增强的开发体验](#增强的开发体验)
- [安全性与最佳实践](#安全性与最佳实践)
- [性能优化与监控](#性能优化与监控)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [社区与生态](#社区与生态)
- [企业级支持](#企业级支持)
- [贡献指南](#贡献指南)
- [加入社区](#加入社区)
- [许可证](#许可证)

### 简介

SimpleJS是一个革命性的纯JavaScript企业级前端应用开发框架，融合"流式编程范式"与现代组件化开发的精髓。它专为构建高性能、可维护的现代Web应用而设计，通过信号驱动的响应式架构和直观的API，显著提升开发效率与应用性能。

作为一款面向未来的框架，SimpleJS特别关注：

- **开发体验优先**：直观的API设计和丰富的开发工具，降低学习曲线
- **性能无妥协**：精确的依赖追踪和智能的更新策略，提供卓越的运行时性能
- **可扩展性**：微内核设计，按需加载功能，确保应用体积最小化
- **企业级支持**：完善的文档、培训资源和技术支持，满足企业级应用需求

无论您是经验丰富的开发者还是前端新手，SimpleJS都提供了渐进式的学习路径和全面的开发支持，让您可以根据项目需求逐步掌握框架的各项能力。

## 核心优势

### 🌊 流式编程范式

SimpleJS的流式编程范式彻底改变了状态管理和组件通信的方式：

- **直观的数据流**：数据流向清晰可见，减少心智负担
- **声明式数据处理**：链式操作处理数据转换，代码更简洁
- **无需模板语法**：直接使用JavaScript表达UI逻辑，降低学习成本
- **响应式数据流**：自动追踪数据变化，实时更新视图

```javascript
// 流式API示例
const users = signal([]);

// 数据处理流
const activeAdmins = flow(users)
  .filter(user => user.isActive && user.role === 'admin')
  .map(user => ({
    id: user.id,
    displayName: `${user.firstName} ${user.lastName}`,
    lastLogin: formatDate(user.lastLogin)
  }))
  .sort((a, b) => a.lastLogin - b.lastLogin);

// 自动响应数据变化
users.update(currentUsers => [...currentUsers, newUser]);
// activeAdmins会自动更新，无需手动处理
```

### ⚡️ 信号驱动架构

信号（Signal）是SimpleJS响应式系统的核心，提供了精确的依赖追踪和高效的更新机制：

- **原子化状态**：状态被分解为独立的信号，便于管理和优化
- **细粒度更新**：只有实际变化的部分才会触发更新，提高性能
- **自动依赖追踪**：无需手动声明依赖，系统自动感知
- **双向响应**：支持单向数据流和双向绑定，根据需求选择
- **持久化连接**：组件间建立信号连接，实现零API通信

```javascript
// 信号基础示例
const count = signal(0);
const doubleCount = compute(() => count.value * 2);

// 使用信号
element('div', { class: 'counter' }, [
  element('p', {}, () => `计数: ${count.value}`),
  element('p', {}, () => `双倍计数: ${doubleCount.value}`),
  element('button', {
    onClick: () => count.update(c => c + 1)
  }, '增加')
]);

// 信号会自动追踪依赖并在变化时更新UI
```

### 🧬 DNA组件系统

DNA（Data-Node-Action）组件系统提供了清晰的关注点分离，提高代码可维护性：

- **数据层（Data）**：管理组件状态和业务逻辑
- **节点层（Node）**：定义组件的DOM结构
- **行为层（Action）**：连接数据与节点，处理事件和生命周期

这种分离使代码更易于理解、测试和维护，同时保持了高性能。

```javascript
// DNA组件示例
const Counter = {
  // 数据层 - 状态和逻辑
  data: {
    count: signal(0),
    increment() {
      this.count.update(c => c + 1);
    }
  },
  
  // 节点层 - DOM结构
  node: {
    container: element('div', { class: 'counter' }),
    display: element('p', { class: 'display' }),
    button: element('button', { class: 'button' }, '增加')
  },
  
  // 行为层 - 连接数据和节点
  action: {
    onCreate() {
      // 数据到视图的绑定
      this.watch(this.data.count, value => {
        this.node.display.textContent = `计数: ${value}`;
      });
      
      // 事件处理
      this.node.button.addEventListener('click', () => {
        this.data.increment();
      });
      
      // 构建DOM结构
      this.node.container.append(
        this.node.display,
        this.node.button
      );
    }
  }
};
```

### 🔄 双向时空追踪

强大的状态管理和时间旅行调试能力：

- **状态时间线**：完整记录应用状态变化历史
- **时间旅行调试**：在不同状态点之间前进后退，快速重现问题
- **状态快照**：创建和恢复应用状态快照，便于测试和演示
- **变更追踪**：精确展示每次更新的状态变化，辅助调试
- **开发工具集成**：浏览器开发工具直接支持，无需额外配置

### 🧩 微内核设计

轻量级核心，按需扩展功能：

- **极小的基础体积**：核心运行时仅5KB，大幅减少初始加载时间
- **按需加载**：功能模块按需引入，优化应用体积
- **插件化架构**：丰富的官方插件和社区插件，扩展核心功能
- **自定义构建**：根据项目需求定制构建，移除未使用功能
- **优化支持**：内置代码拆分和懒加载支持，简化性能优化

## 技术规格

SimpleJS 与其他主流框架的详细技术规格对比：

| 特性 | SimpleJS | Vue | React | Svelte | Angular |
|------|-------|-----|-------|---------|---------|
| 核心理念 | 流式编程范式 | 渐进式框架 | 组件化设计 | 编译优化 | 完整平台 |
| 渲染引擎 | 信号驱动增量渲染 | 虚拟DOM | 虚拟DOM+Fiber | 编译优化 | 变更检测 |
| 状态管理 | 原子化信号 | 响应式对象 | 单向数据流 | 响应式赋值 | RxJS |
| 组件通信 | 零API信号连接 | Props/Events | Props/Context | Props/Context | 服务/Input/Output |
| 运行时体积 | 5KB | 33KB | 42KB | 0KB(编译) | 143KB |
| 学习曲线 | 平缓渐进 | 平缓 | 陡峭 | 中等 | 陡峭 |
| 性能指标 | 极高 | 良好 | 良好 | 极高 | 良好 |
| 首次渲染 | 极快 | 快 | 中等 | 极快 | 慢 |
| 更新渲染 | 极快 | 快 | 中等 | 极快 | 中等 |
| 内存占用 | 极低 | 低 | 中等 | 极低 | 高 |
| TypeScript支持 | 原生支持 | 良好 | 良好 | 良好 | 原生支持 |
| SSR支持 | 完全支持 | 支持 | 支持 | 支持 | 支持 |
| 静态生成 | 内置支持 | 需第三方 | 需第三方 | 支持 | 需配置 |
| 增量静态生成 | 内置支持 | 需第三方 | 需第三方 | 需第三方 | 需配置 |
| Web组件 | 原生支持 | 需包装 | 需工具 | 支持 | 支持 |
| 小程序支持 | 原生支持 | 需转换 | 需转换 | 需转换 | 不支持 |
| 原生应用支持 | 通过适配器 | 通过适配器 | React Native | 需第三方 | NativeScript |
| 自动优化 | 高度自动化 | 部分自动化 | 手动优化 | 编译优化 | 需配置 |
| 开发工具 | 内置全套 | 需第三方 | 需第三方 | 需第三方 | Angular CLI |
| 测试工具 | 内置全套 | 需第三方 | 需第三方 | 需第三方 | 内置支持 |
| 兼容性 | IE11+ | IE11+ | IE11+ | IE11+ | IE11+(部分) |
| 生态系统 | 成长中 | 丰富 | 极其丰富 | 成长中 | 丰富 |

## 封装格式

SimpleJS采用专有的文件格式与开发范式，使开发流程更加顺畅高效：

### 专有文件格式

SimpleJS组件使用`.sjs`扩展名，带来以下优势：

- **更好的IDE支持**：专用语法高亮和智能提示
- **构建优化**：编译时静态分析和优化
- **类型安全**：内置TypeScript支持，无需额外配置
- **开发体验**：专用工具链提供更好的开发体验

```javascript
// 文件：Counter.sjs
export default {
  data: { /* ... */ },
  node: { /* ... */ },
  action: { /* ... */ }
}
```

### 组件类型

SimpleJS支持多种组件编写风格，适应不同需求和习惯：

- **DNA组件**：关注点分离的标准组件结构
- **函数式组件**：简单、无状态的UI片段
- **类组件**：面向对象编程风格的组件
- **JSX支持**：可选的JSX语法支持，便于从React迁移

## 现代框架技术基础

SimpleJS在创新的同时，完全兼容并优化了现代前端框架的核心技术特性：

### 高效渲染系统

SimpleJS的渲染系统结合了虚拟DOM和细粒度响应式的优点：

```javascript
// 传统虚拟DOM渲染
function render() {
  return h('div', { class: 'card' }, [
    h('h1', null, '标题'),
    h('p', null, '内容')
  ]);
}

// SimpleJS增强型渲染（多种优化策略）
function render() {
  // 静态内容自动提升，只创建一次
  return h('div', { class: 'card' }, [
    h.static('h1', null, '标题'),
    
    // 动态内容智能更新，仅在数据变化时更新
    h.dynamic(() => this.content, content => 
      h('p', null, content)
    ),
    
    // 条件渲染
    h.if(() => this.showDetails,
      () => h('div', { class: 'details' }, this.details)
    ),
    
    // 列表渲染（自动优化重用DOM节点）
    h.each(() => this.items, (item, index) => 
      h('li', { key: item.id }, [
        h('span', null, `${index+1}. ${item.name}`)
      ])
    )
  ]);
}
```

### 多样组件化开发范式

SimpleJS支持多种组件编写风格，满足不同开发者的偏好：

```javascript
// 函数式组件 - 简洁易用
export const Button = props => {
  return element('button', { 
    class: `btn ${props.variant || 'default'}`, 
    onClick: props.onClick 
  }, props.children);
};

// 类组件 - 面向对象风格
export class UserCard extends Component {
  setup() {
    // 组件初始化
    return {
      user: signal({ name: '张三', age: 30 }),
      expanded: signal(false)
    };
  }
  
  toggleDetails() {
    this.expanded.update(value => !value);
  }
  
  render() {
    return element('div', { class: 'user-card' }, [
      element('h3', {}, this.user.value.name),
      element('p', {}, `年龄: ${this.user.value.age}`),
      element('button', { 
        onClick: () => this.toggleDetails() 
      }, this.expanded.value ? '收起' : '详情'),
      
      // 条件渲染
      this.expanded.value && element('div', { class: 'details' }, [
        /* 详情内容 */
      ])
    ]);
  }
}

// DNA组件 - 关注点分离
export default {
  data: {
    user: signal({ name: '张三', age: 30 }),
    expanded: signal(false),
    
    toggleDetails() {
      this.expanded.update(value => !value);
    }
  },
  
  node: {
    container: element('div', { class: 'user-card' }),
    name: element('h3'),
    age: element('p'),
    button: element('button'),
    details: element('div', { class: 'details' })
  },
  
  action: {
    onCreate() {
      // 数据绑定
      this.bind(this.data.user, 'name', this.node.name, 'textContent');
      this.watch(this.data.user, user => {
        this.node.age.textContent = `年龄: ${user.age}`;
      });
      
      // 事件处理
      this.node.button.addEventListener('click', () => {
        this.data.toggleDetails();
      });
      
      // 条件渲染
      this.watch(this.data.expanded, expanded => {
        this.node.button.textContent = expanded ? '收起' : '详情';
        if (expanded) {
          this.node.container.appendChild(this.node.details);
        } else {
          this.node.details.remove();
        }
      });
      
      // 组装DOM
      this.node.container.append(
        this.node.name,
        this.node.age,
        this.node.button
      );
    }
  }
}
```

### 响应式数据绑定

SimpleJS的响应式系统结合了多种框架的优点，提供灵活的数据绑定方式：

```javascript
// Vue风格的响应式
const state = reactive({
  count: 0,
  user: { name: '张三' }
});

// React风格的状态钩子 
const [count, setCount] = useState(0);

// SimpleJS信号系统 - 结合两者优点
const count = signal(0);
const user = signal({ name: '张三' });

// 自动计算属性
const doubleCount = compute(() => count.value * 2);
const fullName = compute(() => `${user.value.firstName} ${user.value.lastName}`);

// 响应式监听
watch(count, (newValue, oldValue) => {
  console.log(`count从${oldValue}变为${newValue}`);
});

// 响应式流
flow(user)
  .map(u => u.orders)
  .filter(orders => orders.length > 0)
  .subscribe(orders => {
    // 处理订单逻辑
  });

// 绑定到DOM
bind(count, element, 'textContent', value => `计数: ${value}`);
```

## 渐进式学习路径

SimpleJS提供渐进式的学习体验，从简单到复杂，逐步掌握框架的强大功能：

### 入门级 (1-2天)

初学者可以快速上手基础功能，构建简单应用：

```javascript
// 创建一个简单的计数器组件
const Counter = {
  // 定义状态
  state: {
    count: signal(0)
  },
  
  // 定义视图
  view: () => ({
    tag: 'div',
    children: [
      { 
        tag: 'p', 
        text: () => `当前计数: ${Counter.state.count.value}` 
      },
      { 
        tag: 'button', 
        text: '增加',
        events: {
          click: () => Counter.state.count.update(c => c + 1)
        }
      }
    ]
  })
};

// 挂载到DOM
mount(Counter, '#app');
```

### 基础应用 (1周)

掌握核心概念，构建完整应用：

```javascript
// 使用DNA组件模式构建更复杂的组件
const UserProfile = {
  // 数据层
  data: {
    user: signal(null),
    loading: signal(true),
    error: signal(null),
    
    async fetchUser(id) {
      try {
        this.loading.set(true);
        this.error.set(null);
        const response = await fetch(`/api/users/${id}`);
        
        if (!response.ok) {
          throw new Error('获取用户数据失败');
        }
        
        const data = await response.json();
        this.user.set(data);
      } catch (err) {
        this.error.set(err.message);
      } finally {
        this.loading.set(false);
      }
    }
  },
  
  // 视图结构层
  node: {
    container: element('div', { class: 'user-profile' }),
    loading: element('div', { class: 'loading-indicator' }, '加载中...'),
    error: element('div', { class: 'error-message' }),
    profileCard: element('div', { class: 'profile-card' }),
    avatar: element('img', { class: 'avatar' }),
    name: element('h2', { class: 'name' }),
    email: element('p', { class: 'email' }),
    bio: element('p', { class: 'bio' })
  },
  
  // 行为连接层
  action: {
    onCreate() {
      // 处理加载状态
      this.watch(this.data.loading, (loading) => {
        if (loading) {
          this.node.loading.style.display = 'block';
          this.node.profileCard.style.display = 'none';
          this.node.error.style.display = 'none';
        } else {
          this.node.loading.style.display = 'none';
          
          if (this.data.error.value) {
            this.node.error.style.display = 'block';
            this.node.profileCard.style.display = 'none';
          } else {
            this.node.profileCard.style.display = 'block';
            this.node.error.style.display = 'none';
          }
        }
      });
      
      // 处理错误状态
      this.watch(this.data.error, (error) => {
        if (error) {
          this.node.error.textContent = error;
        }
      });
      
      // 数据绑定
      this.watch(this.data.user, (user) => {
        if (user) {
          this.node.avatar.src = user.avatarUrl;
          this.node.name.textContent = user.name;
          this.node.email.textContent = user.email;
          this.node.bio.textContent = user.bio || '无简介';
        }
      });
      
      // 构建DOM结构
      this.node.profileCard.append(
        this.node.avatar,
        this.node.name,
        this.node.email,
        this.node.bio
      );
      
      this.node.container.append(
        this.node.loading,
        this.node.error,
        this.node.profileCard
      );
    },
    
    onProps(props) {
      if (props.userId) {
        this.data.fetchUser(props.userId);
      }
    }
  }
};
```

### 进阶应用 (2-4周)

深入掌握高级特性，构建复杂应用：

```javascript
// 复杂应用示例 - 数据管理系统的数据表格组件
export const DataTable = {
  // 数据层
  data: {
    items: signal([]),
    filteredItems: compute(() => {
      return this.applyFilters(this.items.value);
    }),
    pagination: signal({
      page: 1,
      pageSize: 10,
      total: 0
    }),
    sorting: signal({
      field: 'id',
      direction: 'asc'
    }),
    filters: signal({}),
    selection: signal([]),
    loading: signal(false),
    
    // 数据处理方法
    applyFilters(items) {
      // 应用过滤条件
      let result = [...items];
      
      // 应用过滤器
      const filters = this.filters.value;
      Object.keys(filters).forEach(field => {
        const filterValue = filters[field];
        if (filterValue) {
          result = result.filter(item => {
            // 根据字段类型应用不同的过滤逻辑
            return String(item[field]).toLowerCase()
              .includes(String(filterValue).toLowerCase());
          });
        }
      });
      
      // 应用排序
      const { field, direction } = this.sorting.value;
      result.sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        
        if (direction === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
      
      return result;
    },
    
    // 分页方法
    setPage(page) {
      this.pagination.update(p => ({...p, page}));
    },
    
    // 排序方法
    setSorting(field) {
      this.sorting.update(s => {
        if (s.field === field) {
          return {
            field,
            direction: s.direction === 'asc' ? 'desc' : 'asc'
          };
        } else {
          return {
            field,
            direction: 'asc'
          };
        }
      });
    },
    
    // 选择方法
    toggleSelection(id) {
      this.selection.update(selected => {
        if (selected.includes(id)) {
          return selected.filter(i => i !== id);
        } else {
          return [...selected, id];
        }
      });
    },
    
    // 加载数据
    async loadData(params = {}) {
      try {
        this.loading.set(true);
        const response = await api.fetchItems({
          ...params,
          page: this.pagination.value.page,
          pageSize: this.pagination.value.pageSize,
          sortField: this.sorting.value.field,
          sortDirection: this.sorting.value.direction
        });
        
        this.items.set(response.data);
        this.pagination.update(p => ({
          ...p,
          total: response.total
        }));
      } catch (error) {
        notificationService.error('加载数据失败');
        console.error(error);
      } finally {
        this.loading.set(false);
      }
    }
  },
  
  // 视图结构层
  node: {
    // ...节点定义
  },
  
  // 行为连接层
  action: {
    // ...行为实现
  }
};
```

### 专家级 (1-2月)

掌握框架所有特性，构建企业级应用：

- **性能优化**：虚拟列表、懒加载和代码拆分
- **状态管理**：复杂应用状态管理策略
- **服务集成**：与后端服务和第三方API集成
- **微前端**：构建和集成微前端架构
- **测试策略**：单元测试、集成测试和端到端测试
- **自定义插件**：开发框架插件和扩展
- **部署管道**：CI/CD流程和自动化部署策略

## 跨框架兼容性

SimpleJS提供全面的跨框架兼容层，可以与Vue、React、Angular等主流框架无缝集成，实现平滑迁移和混合开发：

### 在SimpleJS中使用Vue组件

```javascript
import { mountVueComponent } from 'simplejs/adapters/vue';
import VueCalendar from 'vue-calendar-component';

// 在SimpleJS组件中使用Vue组件
const EventPlanner = {
  data: {
    events: signal([
      { date: '2023-05-15', title: '团队会议' },
      { date: '2023-05-20', title: '产品发布' }
    ]),
    selectedDate: signal(null),
    
    addEvent(date, title) {
      this.events.update(currentEvents => [
        ...currentEvents,
        { date, title }
      ]);
    }
  },
  
  node: {
    container: element('div', { class: 'event-planner' }),
    calendarContainer: element('div', { class: 'calendar-wrapper' }),
    eventList: element('div', { class: 'event-list' }),
    eventForm: element('form', { class: 'event-form' }),
    titleInput: element('input', { 
      type: 'text',
      placeholder: '事件标题',
      class: 'event-title-input'
    }),
    submitButton: element('button', { 
      type: 'submit',
      class: 'submit-button'
    }, '添加事件')
  },
  
  action: {
    onCreate() {
      // 挂载Vue日历组件
      this.vueCalendar = mountVueComponent(VueCalendar, {
        target: this.node.calendarContainer,
        props: {
          events: this.data.events.value,
          onDateSelect: (date) => {
            this.data.selectedDate.set(date);
          }
        },
        // 建立信号与Vue组件的同步
        sync: {
          from: [
            { signal: this.data.events, prop: 'events' }
          ],
          to: [
            { prop: 'selectedDate', signal: this.data.selectedDate }
          ]
        }
      });
      
      // 事件表单处理
      this.node.eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = this.node.titleInput.value.trim();
        const date = this.data.selectedDate.value;
        
        if (title && date) {
          this.data.addEvent(date, title);
          this.node.titleInput.value = '';
        }
      });
      
      // 显示事件列表
      this.watch(this.data.events, (events) => {
        this.renderEventList(events);
      });
      
      // 组装DOM
      this.node.eventForm.append(
        this.node.titleInput,
        this.node.submitButton
      );
      
      this.node.container.append(
        this.node.calendarContainer,
        this.node.eventList,
        this.node.eventForm
      );
    },
    
    // 渲染事件列表
    renderEventList(events) {
      this.node.eventList.innerHTML = '';
      
      if (events.length === 0) {
        this.node.eventList.textContent = '暂无事件';
        return;
      }
      
      // 按日期分组
      const eventsByDate = events.reduce((acc, event) => {
        if (!acc[event.date]) {
          acc[event.date] = [];
        }
        acc[event.date].push(event);
        return acc;
      }, {});
      
      // 渲染分组事件
      Object.keys(eventsByDate).forEach(date => {
        const dateEvents = eventsByDate[date];
        
        const dateGroup = element('div', { class: 'event-date-group' });
        const dateHeading = element('h3', { class: 'date-heading' }, date);
        dateGroup.appendChild(dateHeading);
        
        const eventItems = element('ul', { class: 'event-items' });
        dateEvents.forEach(event => {
          const eventItem = element('li', { class: 'event-item' }, event.title);
          eventItems.appendChild(eventItem);
        });
        
        dateGroup.appendChild(eventItems);
        this.node.eventList.appendChild(dateGroup);
      });
    },
    
    onDestroy() {
      // 清理Vue组件
      if (this.vueCalendar) {
        this.vueCalendar.unmount();
      }
    }
  }
};
```

### 在Vue中使用SimpleJS组件

```vue
<template>
  <div class="vue-container">
    <h2>SimpleJS组件在Vue中的使用</h2>
    
    <!-- SimpleJS组件包装器 -->
    <SimpleJSComponent 
      :component="DataFlowChart"
      :props="chartProps"
      @chart-click="handleChartClick"
    />
    
    <div class="selected-info" v-if="selectedItem">
      已选择: {{ selectedItem.name }} - {{ selectedItem.value }}
    </div>
    
    <!-- 数据控制 -->
    <div class="controls">
      <button @click="addDataPoint">添加数据点</button>
      <button @click="clearData">清空数据</button>
      <label>
        主题:
        <select v-model="chartProps.theme">
          <option value="light">浅色</option>
          <option value="dark">深色</option>
          <option value="colorful">多彩</option>
        </select>
      </label>
    </div>
  </div>
</template>

<script>
import { SimpleJSComponent } from 'simplejs/adapters/vue';
import { DataFlowChart } from '../simplejs-components/DataFlowChart';

export default {
  components: {
    SimpleJSComponent
  },
  
  data() {
    return {
      rawData: [
        { id: 1, label: '销售', count: 145 },
        { id: 2, label: '营销', count: 87 },
        { id: 3, label: '研发', count: 210 },
        { id: 4, label: '客服', count: 65 }
      ],
      chartProps: {
        data: [],
        theme: 'light',
        animated: true,
        height: 400
      },
      selectedItem: null
    };
  },
  
  created() {
    this.chartProps.data = this.processData();
  },
  
  methods: {
    processData() {
      return this.rawData.map(item => ({
        id: item.id,
        name: item.label,
        value: item.count,
        color: this.getColor(item.count)
      }));
    },
    
    handleChartClick(item) {
      this.selectedItem = item;
      this.$emit('item-selected', item);
    },
    
    getColor(value) {
      return value > 100 ? '#ff5722' : '#4caf50';
    },
    
    addDataPoint() {
      const id = Math.max(0, ...this.rawData.map(d => d.id)) + 1;
      this.rawData.push({
        id,
        label: `数据${id}`,
        count: Math.floor(Math.random() * 200) + 20
      });
      
      this.chartProps.data = this.processData();
    },
    
    clearData() {
      this.rawData = [];
      this.chartProps.data = [];
      this.selectedItem = null;
    }
  }
};
</script>
```

### 在React中使用SimpleJS组件

```jsx
import React, { useState, useEffect } from 'react';
import { SimpleJSComponent } from 'simplejs/adapters/react';
import { UserDashboard } from '../simplejs-components/UserDashboard';

const DashboardPage = () => {
  const [userData, setUserData] = useState({
    name: 'React用户',
    role: '开发者',
    projects: [
      { id: 1, name: '项目A', status: 'active' },
      { id: 2, name: '项目B', status: 'completed' }
    ],
    activities: [
      { id: 1, type: 'comment', content: '评论了项目A', time: '2小时前' },
      { id: 2, type: 'commit', content: '提交了代码到项目B', time: '昨天' }
    ]
  });
  
  const [notifications, setNotifications] = useState([]);
  
  // 模拟获取通知
  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() > 0.7) {
        setNotifications(prev => [
          {
            id: Date.now(),
            content: `新通知 ${prev.length + 1}`,
            time: new Date().toLocaleTimeString()
          },
          ...prev
        ]);
      }
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  // 处理来自SimpleJS组件的事件
  const handleProjectSelect = (project) => {
    console.log('项目被选择:', project);
    // 处理项目选择逻辑
  };
  
  return (
    <div className="dashboard-container">
      <h1>用户仪表盘</h1>
      
      {/* SimpleJS组件集成 */}
      <SimpleJSComponent
        component={UserDashboard}
        props={{
          user: userData,
          notifications: notifications,
          onProjectSelect: handleProjectSelect
        }}
        // 设置双向数据流
        bindToState={{
          notifications: {
            value: notifications,
            setter: setNotifications
          }
        }}
      />
      
      {/* React UI部分 */}
      <div className="react-controls">
        <button onClick={() => {
          setUserData(prev => ({
            ...prev,
            projects: [
              ...prev.projects,
              {
                id: prev.projects.length + 1,
                name: `新项目 ${prev.projects.length + 1}`,
                status: 'planning'
              }
            ]
          }));
        }}>
          添加项目
        </button>
        
        <button onClick={() => {
          setNotifications([]);
        }}>
          清除通知
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
```

## 增强的开发体验

SimpleJS专注于提供卓越的开发者体验，通过丰富的工具和功能使开发流程更加高效和愉悦：

### 智能开发工具

SimpleJS生态系统包含一系列专业开发工具，加速开发流程：

#### SimpleJS DevTools

浏览器扩展，为开发者提供深入的应用洞察：

- **组件树检查**：可视化组件层次结构和属性
- **信号追踪**：实时监控信号值变化和依赖关系
- **时间旅行调试**：记录状态变化，在时间线上前进后退
- **性能分析**：识别性能瓶颈和优化机会
- **网络监控**：追踪API请求和响应
- **存储检查**：检查本地存储和会话存储
- **自定义事件监听**：跟踪自定义事件触发和处理

#### IDE集成

为主流IDE提供专业插件支持：

- **VS Code插件**：
  - 智能语法高亮
  - 代码补全和提示
  - 组件导航和引用查找
  - 代码片段
  - 内联文档
  - 重构工具
  - 内置调试器

- **WebStorm/IntelliJ插件**：
  - 高级语法感知
  - 智能重构
  - 意图操作
  - 内联错误检测
  - 带环境感知的调试工具

### 智能AI辅助开发

SimpleJS集成了先进的AI开发助手，加速开发流程：

```javascript
// AI辅助代码生成
// 只需描述你需要的组件功能

// @ai-generate: "创建一个用户资料表单，包含姓名、邮箱和头像上传"
const UserProfileForm = {
  data: {
    user: signal({
      name: '',
      email: '',
      avatar: null
    }),
    validationErrors: signal({}),
    isSubmitting: signal(false),
    
    validateForm() {
      const errors = {};
      const user = this.user.value;
      
      if (!user.name.trim()) {
        errors.name = '姓名不能为空';
      }
      
      if (!user.email.trim()) {
        errors.email = '邮箱不能为空';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        errors.email = '邮箱格式不正确';
      }
      
      this.validationErrors.set(errors);
      return Object.keys(errors).length === 0;
    },
    
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }
      
      this.isSubmitting.set(true);
      try {
        // 模拟API请求
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 提交成功处理
        notificationService.success('资料已更新');
      } catch (error) {
        notificationService.error('提交失败，请重试');
      } finally {
        this.isSubmitting.set(false);
      }
    }
  },
  
  node: {
    // AI生成的表单节点结构
    form: element('form', { class: 'profile-form' }),
    nameField: inputGroup('姓名', 'text'),
    emailField: inputGroup('邮箱', 'email'),
    avatarUpload: fileUploader('头像', ['image/jpeg', 'image/png'], {
      maxSize: 5 * 1024 * 1024, // 5MB
      crop: true
    }),
    submitButton: element('button', { 
      type: 'submit',
      class: 'btn btn-primary'
    }, '保存')
  },
  
  action: {
    onCreate() {
      // 字段绑定
      this.bind(this.data.user, 'name', this.node.nameField.input, 'value');
      this.bind(this.data.user, 'email', this.node.emailField.input, 'value');
      
      // 错误处理
      this.watch(this.data.validationErrors, errors => {
        // 显示姓名错误
        if (errors.name) {
          this.node.nameField.showError(errors.name);
        } else {
          this.node.nameField.hideError();
        }
        
        // 显示邮箱错误
        if (errors.email) {
          this.node.emailField.showError(errors.email);
        } else {
          this.node.emailField.hideError();
        }
      });
      
      // 头像上传处理
      this.node.avatarUpload.onImageSelect(file => {
        const reader = new FileReader();
        reader.onload = e => {
          this.data.user.update(user => ({
            ...user,
            avatar: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      });
      
      // 提交处理
      this.node.form.addEventListener('submit', e => {
        e.preventDefault();
        this.data.submitForm();
      });
      
      // 加载状态处理
      this.watch(this.data.isSubmitting, isSubmitting => {
        this.node.submitButton.disabled = isSubmitting;
        this.node.submitButton.textContent = isSubmitting ? '保存中...' : '保存';
      });
      
      // 组装表单
      this.node.form.append(
        this.node.nameField.container,
        this.node.emailField.container,
        this.node.avatarUpload.container,
        this.node.submitButton
      );
    }
  }
};
```

### 生产力功能

SimpleJS提供多种生产力功能，加快开发速度：

#### 代码生成器

```bash
# 创建新组件
sjs generate component UserProfile

# 创建页面组件
sjs generate page Dashboard

# 创建服务
sjs generate service AuthService

# 创建自定义钩子
sjs generate hook useWindowSize
```

#### 项目模板

```bash
# 创建企业级项目
sjs create my-enterprise-app --template enterprise

# 创建电商项目
sjs create my-shop --template ecommerce

# 创建管理后台
sjs create admin-panel --template admin-dashboard

# 创建博客
sjs create my-blog --template blog
```

#### 快速原型工具

```bash
# 启动快速原型环境
sjs prototype

# 导出原型为项目
sjs prototype export my-project
```

## 安全性与最佳实践

SimpleJS将安全性作为核心设计原则，提供全面的安全防护机制：

### 自动XSS防护

SimpleJS提供多层次的XSS防护，确保应用安全：

```javascript
// 自动上下文感知的输出编码
const ProfileCard = {
  data: {
    user: signal({
      name: 'John<script>alert("XSS")</script>', // 潜在的XSS载荷
      bio: '<b>Web开发者</b>',
      website: 'https://example.com'
    })
  },
  
  render() {
    return element('div', { class: 'profile' }, [
      // 文本内容自动编码，安全显示用户输入
      element('h2', {}, this.data.user.value.name), // 自动编码，显示为纯文本
      
      // 链接安全处理
      element('a', { 
        href: safeURL(this.data.user.value.website), // URL安全检查
        rel: 'noopener noreferrer',
        target: '_blank'
      }, '访问网站'),
      
      // 安全的HTML渲染，经过严格消毒处理
      element('div', {}, [
        safeHTML(this.data.user.value.bio, {
          allowedTags: ['b', 'i', 'em', 'strong'],
          allowedAttributes: {} // 不允许任何属性
        })
      ])
    ]);
  }
};
```

### CSRF防护

SimpleJS提供内置的CSRF防护机制：

```javascript
// API服务配置
const apiService = createAPIService({
  baseURL: '/api',
  csrf: {
    enabled: true,
    headerName: 'X-CSRF-Token',
    cookieName: 'csrf-token',
    refreshEndpoint: '/csrf/refresh'
  }
});

// 自动处理CSRF令牌
apiService.post('/users', userData);
```

### 内容安全策略

SimpleJS支持内容安全策略(CSP)配置：

```javascript
// 应用配置
const app = createApp({
  // CSP配置
  contentSecurityPolicy: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'wasm-unsafe-eval'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', 'blob:'],
    'font-src': ["'self'"],
    'connect-src': ["'self'", 'https://api.example.com'],
    'worker-src': ["'self'", 'blob:'],
    'report-uri': '/csp-report'
  }
});
```

### 安全状态管理

SimpleJS提供安全的状态管理功能：

```javascript
// 敏感数据处理
const userProfile = signal({
  username: 'user123',
  email: 'user@example.com'
}, {
  // 敏感字段不持久化到本地存储
  persist: {
    enabled: true,
    key: 'user-profile',
    exclude: ['email', 'phone', 'address']
  },
  
  // 敏感字段不包含在日志中
  logging: {
    exclude: ['email', 'phone', 'password']
  }
});

// 加密持久化存储
const secureStorage = createSecureStorage({
  key: 'user-sensitive-data',
  algorithm: 'AES-GCM',
  encryptionKey: derivedKey // 从用户密码派生
});

// 安全存储敏感信息
secureStorage.set('paymentDetails', {
  cardNumber: '4111111111111111',
  cvv: '123'
});
```

### 安全审计工具

SimpleJS提供内置的安全审计工具：

```javascript
// 开发工具命令
sjs audit security

// 输出示例:
// [警告] 发现3个潜在安全问题:
// 1. 组件 'UserProfile' 使用了不安全的 innerHTML
// 2. 服务 'PaymentService' 未使用 HTTPS
// 3. 表单 'LoginForm' 缺少CSRF保护
```

### 用户输入验证

SimpleJS提供强大的输入验证功能：

```javascript
// 表单验证
const registrationForm = {
  data: {
    formData: signal({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }),
    
    // 验证规则
    validationRules: {
      username: [
        { rule: 'required', message: '用户名不能为空' },
        { rule: 'minLength', value: 3, message: '用户名至少3个字符' },
        { rule: 'pattern', value: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' }
      ],
      email: [
        { rule: 'required', message: '邮箱不能为空' },
        { rule: 'email', message: '邮箱格式不正确' }
      ],
      password: [
        { rule: 'required', message: '密码不能为空' },
        { rule: 'minLength', value: 8, message: '密码至少8个字符' },
        { rule: 'pattern', value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: '密码必须包含大小写字母和数字' }
      ],
      confirmPassword: [
        { rule: 'required', message: '请确认密码' },
        { rule: 'equals', field: 'password', message: '两次密码输入不一致' }
      ]
    },
    
    // 验证状态
    validation: signal({
      errors: {},
      dirty: {},
      valid: false
    }),
    
    // 验证方法
    validate(field) {
      const value = this.formData.value[field];
      const rules = this.validationRules[field];
      
      // 标记字段为已修改
      this.validation.update(v => ({
        ...v,
        dirty: {
          ...v.dirty,
          [field]: true
        }
      }));
      
      // 验证字段
      for (const rule of rules) {
        let valid = true;
        
        switch (rule.rule) {
          case 'required':
            valid = value.trim() !== '';
            break;
          case 'minLength':
            valid = value.length >= rule.value;
            break;
          case 'pattern':
            valid = rule.value.test(value);
            break;
          case 'email':
            valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            break;
          case 'equals':
            valid = value === this.formData.value[rule.field];
            break;
        }
        
        if (!valid) {
          this.setFieldError(field, rule.message);
          return false;
        }
      }
      
      // 验证通过，清除错误
      this.clearFieldError(field);
      return true;
    },
    
    // 设置字段错误
    setFieldError(field, message) {
      this.validation.update(v => ({
        ...v,
        errors: {
          ...v.errors,
          [field]: message
        },
        valid: false
      }));
    },
    
    // 清除字段错误
    clearFieldError(field) {
      this.validation.update(v => {
        const errors = {...v.errors};
        delete errors[field];
        
        return {
          ...v,
          errors,
          valid: Object.keys(errors).length === 0
        };
      });
    },
    
    // 验证所有字段
    validateAll() {
      let allValid = true;
      
      Object.keys(this.validationRules).forEach(field => {
        const fieldValid = this.validate(field);
        allValid = allValid && fieldValid;
      });
      
      return allValid;
    },
    
    // 提交表单
    submitForm() {
      if (this.validateAll()) {
        // 表单验证通过，可以安全提交
        console.log('表单数据:', this.formData.value);
      }
    }
  },
  
  // 视图和行为略...
};
```

## 性能优化与监控

SimpleJS提供全面的性能优化策略和监控工具，确保应用始终保持最佳性能：

### 自动性能优化

SimpleJS内置多种性能优化策略，无需开发者手动干预：

```javascript
// 创建应用时启用优化选项
const app = createApp({
  // 性能优化配置
  optimization: {
    // 静态提升 - 静态内容只创建一次
    staticHoisting: true,
    
    // 条件渲染优化
    conditionalRendering: {
      caching: true,  // 缓存条件分支
      lazyEvaluation: true // 延迟计算未显示分支
    },
    
    // 列表渲染优化
    listRendering: {
      recycling: true, // DOM节点回收复用
      windowing: true  // 自动虚拟列表（仅渲染可见项）
    },
    
    // 更新优化
    updateOptimization: {
      batchUpdates: true, // 批量更新
      prioritization: true // 优先级更新（UI阻塞操作延迟）
    },
    
    // 代码分割
    codeSplitting: {
      auto: true, // 自动分析和分割代码
      prefetch: 'viewport' // 视口内资源预加载
    }
  }
});
```

### 内存管理

SimpleJS提供先进的内存管理机制，防止内存泄漏：

```javascript
// 信号自动清理
const ProfilePage = {
  data: {
    // 用户离开页面时自动取消订阅和清理
    userProfile: signal(null, { 
      autoDispose: true,
      disposeDelay: 60000 // 延迟1分钟再清理（以便返回）
    }),
    
    subscriptions: [],
    
    fetchProfile(id) {
      // 自动管理API订阅
      const subscription = api.profile(id).subscribe(data => {
        this.userProfile.set(data);
      });
      
      // 注册清理
      this.subscriptions.push(subscription);
    }
  },
  
  action: {
    // 页面销毁时清理资源
    onDestroy() {
      // 取消所有API订阅
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.subscriptions = [];
      
      // 主动清理大型资源
      this.userProfile.dispose();
    }
  }
};
```

### 综合性能监控

SimpleJS提供全面的性能监控功能，实时监测应用性能：

```javascript
// 性能监控配置
const app = createApp({
  // 启用性能监控
  performance: {
    // Web Vitals监控
    webVitals: {
      enabled: true,
      reportTo: 'https://analytics.example.com/vitals'
    },
    
    // 关键指标监控
    metrics: ['FP', 'FCP', 'LCP', 'TTI', 'CLS', 'FID'],
    
    // 自定义性能标记和指标
    custom: {
      dataLoadTime: {
        description: '数据加载时间',
        start: 'data-fetch-start',
        end: 'data-fetch-complete'
      },
      renderTime: {
        description: '渲染耗时',
        start: 'render-start',
        end: 'render-complete'
      }
    },
    
    // 性能预算
    budgets: {
      LCP: 2500, // 最大内容绘制 2.5秒
      FID: 100,  // 首次输入延迟 100ms
      CLS: 0.1,  // 累积布局偏移 0.1
      TTI: 3500, // 可交互时间 3.5秒
      
      // 打包体积预算
      bundles: {
        total: 300, // 总体积不超过300KB
        initial: 120, // 初始加载不超过120KB
        async: 80    // 异步模块不超过80KB
      }
    },
    
    // 自动性能报告
    reporting: {
      console: true, // 开发模式下控制台输出
      beacons: true, // 发送性能信标
      errorThreshold: true // 性能超出预算时报错
    }
  }
});

// 添加性能标记
performance.mark('data-fetch-start');
await fetchData();
performance.mark('data-fetch-complete');

// 手动测量性能
performance.measure('data-loading', 'data-fetch-start', 'data-fetch-complete');
```

### 可视化性能工具

SimpleJS DevTools提供强大的性能分析工具：

- **性能时间线**：可视化展示应用各阶段性能
- **组件渲染热图**：识别高频重渲染组件
- **信号依赖图**：分析信号依赖关系和更新链
- **网络瀑布图**：监控API请求性能
- **内存使用分析**：识别内存泄漏和大型对象
- **CPU使用率**：展示CPU使用峰值和瓶颈
- **资源使用统计**：分析资源加载和使用情况

### 自动优化建议

SimpleJS提供智能性能优化建议：

```bash
# 运行性能审计
sjs audit performance

# 输出示例:
# [性能建议] 发现5个性能优化机会:
# 1. 组件 'UserList' 频繁重渲染，建议使用memo包装
# 2. 信号 'userSettings' 依赖链过长，建议拆分
# 3. 图片 'hero.jpg' 未优化，建议压缩（可节省1.2MB）
# 4. 存在3个未使用的组件导入，增加了32KB包体积
# 5. API 'getUserData' 耗时超过3秒，建议添加缓存
```

## 快速开始

### 安装

```bash
# 安装CLI工具
npm install -g sjs-cli

# 创建新项目
sjs create my-project
# 选择模板: [Basic|企业级|电商|管理后台|博客]

# 进入项目目录
cd my-project

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 项目结构

```
my-project/
 ├── public/              # 静态资源
 ├── src/
 │    ├── flows/          # 流式组件
 │    ├── signals/        # 共享信号
 │    ├── dna/            # DNA组件
 │    ├── adapters/       # 平台适配器
 │    ├── transforms/     # 数据变换
 │    ├── pages/          # 页面组件
 │    ├── components/     # 通用组件
 │    ├── services/       # 业务服务
 │    ├── utils/          # 工具函数
 │    ├── styles/         # 全局样式
 │    ├── router/         # 路由配置
 │    ├── store/          # 状态管理
 │    ├── app.sjs         # 应用入口
 │    └── main.js         # 启动文件
 ├── tests/               # 测试文件
 ├── sjs.config.js        # 框架配置
 └── package.json
```

## 社区与生态

SimpleJS拥有活跃的社区和丰富的生态系统：

### 组件库

- **SimpleJS UI**: 官方UI组件库，提供100+高质量组件
- **SimpleJS Pro**: 企业级组件集，包含表格、图表、表单等高级组件
- **SimpleJS Mobile**: 移动端组件库，针对触摸交互优化
- **第三方社区组件**: 社区贡献的主题和专用组件

### 插件系统

- **状态管理**: 高级状态管理插件，支持中心化和去中心化方案
- **路由**: 客户端路由、服务端路由和静态站点生成
- **国际化**: 多语言支持，包含20+语言包
- **表单**: 高级表单处理，包含验证、向导和动态表单
- **认证**: 用户认证和授权系统，支持多种认证方式
- **API**: REST和GraphQL客户端，自动数据同步
- **动画**: 高性能动画系统，支持关键帧和基于物理的动画

## 企业级支持

SimpleJS为企业用户提供全面的支持和服务：

- **技术支持**: 专业技术支持，快速解决问题
- **培训课程**: 定制化培训课程，帮助团队快速上手
- **性能优化**: 专业性能优化服务，提升应用性能
- **架构咨询**: 针对大型应用的架构设计和技术选型咨询
- **安全审计**: 代码安全审计和安全最佳实践建议
- **升级服务**: 平滑升级服务，确保版本升级不影响业务

## 贡献指南

SimpleJS是一个开源项目，我们欢迎并感谢社区贡献。以下是参与贡献的指导原则：

### 行为准则

SimpleJS项目采用贡献者公约（Contributor Covenant）作为行为准则，我们期望所有参与者遵守这些准则。不当行为将不被容忍。

### 贡献方式

您可以通过多种方式参与贡献：

- **提交Bug报告**：帮助我们发现并修复问题
- **功能建议**：提出新功能和改进建议
- **改进文档**：修正、完善或翻译文档
- **提交代码**：修复bug或实现新功能
- **创建教程**：编写教程或最佳实践指南
- **回答问题**：在论坛和社区中帮助其他开发者

### 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/simplejs/framework.git
cd framework

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行测试
npm test

# 构建项目
npm run build
```

### 代码风格指南

SimpleJS项目遵循以下代码风格规范：

```javascript
// 使用2个空格缩进
function example() {
  const value = true;
  
  // 使用驼峰命名法
  function calculateValue() {
    return value;
  }
  
  // 优先使用const和let
  const result = calculateValue();
  let counter = 0;
  
  // 使用模板字符串
  return `结果是: ${result}`;
}
```

我们使用ESLint和Prettier强制执行代码风格，提交前请确保代码通过lint检查：

```bash
# 运行代码风格检查
npm run lint

# 自动修复风格问题
npm run lint:fix
```

### 提交规范

我们使用约定式提交（Conventional Commits）规范：

```
<类型>[可选的作用域]: <描述>

[可选的正文]

[可选的脚注]
```

提交类型包括：
- **feat**: 新功能
- **fix**: 错误修复
- **docs**: 文档更新
- **style**: 代码风格调整
- **refactor**: 代码重构
- **perf**: 性能优化
- **test**: 添加或修改测试
- **build**: 构建系统或外部依赖变更
- **ci**: CI配置变更
- **chore**: 其他变更

示例：
```
feat(signal): 添加信号批处理功能

添加批量更新信号功能，显著提升大量信号同时更新时的性能。

关闭 #123
```

### Pull Request流程

1. 从主分支创建功能分支
2. 进行必要的更改
3. 确保代码通过测试和lint检查
4. 提交PR并填写详细描述
5. 等待代码审查并处理反馈

### 版本发布流程

SimpleJS使用语义化版本控制（Semantic Versioning）：

- **主版本号**：不兼容的API变更
- **次版本号**：向后兼容的功能新增
- **修订号**：向后兼容的问题修复

### 社区开发路线图

我们维护公开的开发路线图，帮助贡献者了解项目的发展方向：

- **短期目标**：未来3个月的计划
- **中期目标**：未来6-12个月的计划
- **长期愿景**：项目的长期方向

贡献者可以在GitHub讨论区提出建议和看法。

### 社区项目展示

我们鼓励开发者分享使用SimpleJS构建的项目，优秀的项目将被展示在官方网站：

- 提交项目展示可以通过GitHub讨论区
- 包含项目描述、截图和GitHub链接
- 特别欢迎开源项目和教育资源

## 许可证

MIT

---

<a name="english-documentation"></a>
## English Documentation

### Table of Contents

- [Introduction](#introduction)
- [Core Advantages](#core-advantages)
- [Technical Specifications](#technical-specifications)
- [Modern Framework Technology Foundations](#modern-framework-technology-foundations)
- [Progressive Learning Path](#progressive-learning-path)
- [Encapsulation Format](#encapsulation-format)
- [Cross-framework Compatibility](#cross-framework-compatibility)
- [Enhanced Development Experience](#enhanced-development-experience)
- [Security and Best Practices](#security-and-best-practices)
- [Performance Optimization and Monitoring](#performance-optimization-and-monitoring)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Community and Ecosystem](#community-and-ecosystem)
- [Enterprise Support](#enterprise-support)
- [Contribution Guidelines](#contribution-guidelines)
- [Join the Community](#join-the-community)
- [License](#license)

<a name="introduction"></a>
### Introduction

SimpleJS is a revolutionary pure JavaScript enterprise-level front-end application development framework that combines "flow programming paradigm" with modern component-based development. It is specifically designed to build high-performance, maintainable modern web applications, significantly improving development efficiency and application performance through signal-driven reactive architecture and intuitive APIs.

As a future-oriented framework, SimpleJS particularly focuses on:

- **Developer Experience First**: Intuitive API design and rich development tools, reducing the learning curve
- **No Performance Compromise**: Precise dependency tracking and intelligent update strategies, providing exceptional runtime performance
- **Scalability**: Micro-kernel design, on-demand loading of features, ensuring minimal application size
- **Enterprise-level Support**: Comprehensive documentation, training resources, and technical support, meeting enterprise application requirements

Whether you are an experienced developer or a front-end novice, SimpleJS provides a progressive learning path and comprehensive development support, allowing you to gradually master the framework's capabilities according to your project needs.

<a name="core-advantages"></a>
### Core Advantages

#### 🌊 Flow Programming Paradigm

SimpleJS's flow programming paradigm fundamentally changes how state management and component communication work:

- **Intuitive Data Flow**: Data flow is clearly visible, reducing mental load
- **Declarative Data Processing**: Chain operations for data transformation, making code more concise
- **No Template Syntax Required**: Express UI logic directly using JavaScript, lowering the learning cost
- **Reactive Data Flow**: Automatically track data changes, update views in real-time

```javascript
// Flow API example
const users = signal([]);

// Data processing flow
const activeAdmins = flow(users)
  .filter(user => user.isActive && user.role === 'admin')
  .map(user => ({
    id: user.id,
    displayName: `${user.firstName} ${user.lastName}`,
    lastLogin: formatDate(user.lastLogin)
  }))
  .sort((a, b) => a.lastLogin - b.lastLogin);

// Automatically responds to data changes
users.update(currentUsers => [...currentUsers, newUser]);
// activeAdmins will update automatically, no manual handling needed
```

#### ⚡️ Signal-Driven Architecture

Signals are the core of SimpleJS's reactive system, providing precise dependency tracking and efficient update mechanisms:

- **Atomic State**: State is broken down into independent signals, easier to manage and optimize
- **Fine-grained Updates**: Only actually changed parts trigger updates, improving performance
- **Automatic Dependency Tracking**: No need to manually declare dependencies, the system detects them automatically
- **Bidirectional Response**: Support for one-way data flow and two-way binding, choose according to your needs
- **Persistent Connections**: Signals establish connections between components, enabling zero-API communication

```javascript
// Signal basics example
const count = signal(0);
const doubleCount = compute(() => count.value * 2);

// Using signals
element('div', { class: 'counter' }, [
  element('p', {}, () => `Count: ${count.value}`),
  element('p', {}, () => `Double count: ${doubleCount.value}`),
  element('button', {
    onClick: () => count.update(c => c + 1)
  }, 'Increase')
]);

// Signals automatically track dependencies and update the UI when changed
```

#### 🧬 DNA Component System

The DNA (Data-Node-Action) component system provides clear separation of concerns, improving code maintainability:

- **Data Layer**: Manages component state and business logic
- **Node Layer**: Defines the component's DOM structure
- **Action Layer**: Connects data with nodes, handles events and lifecycle

This separation makes code easier to understand, test, and maintain, while maintaining high performance.

```javascript
// DNA component example
const Counter = {
  // Data layer - state and logic
  data: {
    count: signal(0),
    increment() {
      this.count.update(c => c + 1);
    }
  },
  
  // Node layer - DOM structure
  node: {
    container: element('div', { class: 'counter' }),
    display: element('p', { class: 'display' }),
    button: element('button', { class: 'button' }, 'Increase')
  },
  
  // Action layer - connecting data and nodes
  action: {
    onCreate() {
      // Data to view binding
      this.watch(this.data.count, value => {
        this.node.display.textContent = `Count: ${value}`;
      });
      
      // Event handling
      this.node.button.addEventListener('click', () => {
        this.data.increment();
      });
      
      // Building DOM structure
      this.node.container.append(
        this.node.display,
        this.node.button
      );
    }
  }
};
```

#### 🔄 Bidirectional Time-Space Tracking

Powerful state management and time-travel debugging capabilities:

- **State Timeline**: Complete record of application state change history
- **Time-Travel Debugging**: Move back and forth between different state points, quickly reproduce issues
- **State Snapshots**: Create and restore application state snapshots for testing and demonstrations
- **Change Tracking**: Precisely display state changes for each update, aiding debugging
- **Dev Tools Integration**: Direct browser development tool support, no additional configuration needed

#### 🧩 Micro-Kernel Design

Lightweight core with on-demand feature extensions:

- **Extremely Small Base Size**: Core runtime is only 5KB, dramatically reducing initial load time
- **On-Demand Loading**: Feature modules imported as needed, optimizing application size
- **Plugin Architecture**: Rich official and community plugins extending core functionality
- **Custom Builds**: Customize builds based on project requirements, remove unused features
- **Optimization Support**: Built-in code splitting and lazy loading support, simplifying performance optimization

<a name="technical-specifications"></a>
### Technical Specifications

Detailed technical specifications comparison between SimpleJS and other mainstream frameworks:

| Feature | SimpleJS | Vue | React | Svelte | Angular |
|------|-------|-----|-------|---------|---------|
| Core Concept | Flow Programming Paradigm | Progressive Framework | Component Design | Compile-time Optimization | Complete Platform |
| Rendering Engine | Signal-driven Incremental Rendering | Virtual DOM | Virtual DOM+Fiber | Compile-time Optimization | Change Detection |
| State Management | Atomic Signals | Reactive Objects | Unidirectional Data Flow | Reactive Assignments | RxJS |
| Component Communication | Zero-API Signal Connection | Props/Events | Props/Context | Props/Context | Services/Input/Output |
| Runtime Size | 5KB | 33KB | 42KB | 0KB (compiled) | 143KB |
| Learning Curve | Gradual | Gentle | Steep | Moderate | Steep |
| Performance | Excellent | Good | Good | Excellent | Good |
| Initial Render | Very Fast | Fast | Moderate | Very Fast | Slow |
| Update Rendering | Very Fast | Fast | Moderate | Very Fast | Moderate |
| Memory Usage | Very Low | Low | Moderate | Very Low | High |
| TypeScript Support | Native | Good | Good | Good | Native |
| SSR Support | Full | Supported | Supported | Supported | Supported |
| Static Generation | Built-in | Third-party | Third-party | Supported | Requires Config |
| Incremental Static Generation | Built-in | Third-party | Third-party | Third-party | Requires Config |
| Web Components | Native | Requires Wrapper | Requires Tools | Supported | Supported |
| Mini Program Support | Native | Requires Conversion | Requires Conversion | Requires Conversion | Not Supported |
| Native App Support | Via Adapters | Via Adapters | React Native | Third-party | NativeScript |
| Automatic Optimization | Highly Automated | Partially Automated | Manual | Compile-time | Requires Config |
| Development Tools | Built-in Suite | Third-party | Third-party | Third-party | Angular CLI |
| Testing Tools | Built-in Suite | Third-party | Third-party | Third-party | Built-in |
| Compatibility | IE11+ | IE11+ | IE11+ | IE11+ | IE11+ (partial) |
| Ecosystem | Growing | Rich | Very Rich | Growing | Rich |

<a name="encapsulation-format"></a>
### Encapsulation Format

SimpleJS uses proprietary file formats and development paradigms to make the development process smoother and more efficient:

#### Proprietary File Format

SimpleJS components use the `.sjs` extension, bringing the following advantages:

- **Better IDE Support**: Dedicated syntax highlighting and smart suggestions
- **Build Optimization**: Compile-time static analysis and optimization
- **Type Safety**: Built-in TypeScript support without additional configuration
- **Development Experience**: Dedicated toolchain provides a better development experience

```javascript
// File: Counter.sjs
export default {
  data: { /* ... */ },
  node: { /* ... */ },
  action: { /* ... */ }
}
```

#### Component Types

SimpleJS supports multiple component writing styles, adapting to different needs and habits:

- **DNA Components**: Standard component structure with separation of concerns
- **Functional Components**: Simple, stateless UI fragments
- **Class Components**: Object-oriented programming style components
- **JSX Support**: Optional JSX syntax support, making it easy to migrate from React

<a name="modern-framework-technology-foundations"></a>
### Modern Framework Technology Foundations

While innovating, SimpleJS is fully compatible with and optimizes the core technical features of modern front-end frameworks:

#### Efficient Rendering System

SimpleJS's rendering system combines the advantages of Virtual DOM and fine-grained reactivity:

```javascript
// Traditional Virtual DOM rendering
function render() {
  return h('div', { class: 'card' }, [
    h('h1', null, 'Title'),
    h('p', null, 'Content')
  ]);
}

// SimpleJS enhanced rendering (multiple optimization strategies)
function render() {
  // Static content automatically elevated, created only once
  return h('div', { class: 'card' }, [
    h.static('h1', null, 'Title'),
    
    // Dynamic content intelligently updated, only when data changes
    h.dynamic(() => this.content, content => 
      h('p', null, content)
    ),
    
    // Conditional rendering
    h.if(() => this.showDetails,
      () => h('div', { class: 'details' }, this.details)
    ),
    
    // List rendering (automatically optimizes DOM node reuse)
    h.each(() => this.items, (item, index) => 
      h('li', { key: item.id }, [
        h('span', null, `${index+1}. ${item.name}`)
      ])
    )
  ]);
}
```

#### Diverse Component Development Paradigms

SimpleJS supports multiple component writing styles, catering to different developer preferences:

```javascript
// Functional component - concise and clean
export const Button = props => {
  return element('button', { 
    class: `btn ${props.variant || 'default'}`, 
    onClick: props.onClick 
  }, props.children);
};

// Class component - object-oriented style
export class UserCard extends Component {
  setup() {
    // Component initialization
    return {
      user: signal({ name: 'John', age: 30 }),
      expanded: signal(false)
    };
  }
  
  toggleDetails() {
    this.expanded.update(value => !value);
  }
  
  render() {
    return element('div', { class: 'user-card' }, [
      element('h3', {}, this.user.value.name),
      element('p', {}, `Age: ${this.user.value.age}`),
      element('button', { 
        onClick: () => this.toggleDetails() 
      }, this.expanded.value ? 'Hide Details' : 'Show Details'),
      
      this.expanded.value && element('div', { class: 'details' }, [
        // Details content
      ])
    ]);
  }
}

// DNA component - separation of concerns
export default {
  data: {
    user: signal({ name: 'John', age: 30 }),
    expanded: signal(false),
    
    toggleDetails() {
      this.expanded.update(value => !value);
    }
  },
  
  node: {
    container: element('div', { class: 'user-card' }),
    name: element('h3'),
    age: element('p'),
    button: element('button'),
    details: element('div', { class: 'details' })
  },
  
  action: {
    onCreate() {
      // Data binding
      this.bind(this.data.user, 'name', this.node.name, 'textContent');
      this.watch(this.data.user, user => {
        this.node.age.textContent = `Age: ${user.age}`;
      });
      
      // Event handling
      this.node.button.addEventListener('click', () => {
        this.data.toggleDetails();
      });
      
      // Conditional display
      this.watch(this.data.expanded, expanded => {
        this.node.button.textContent = expanded ? 'Hide Details' : 'Show Details';
        if (expanded) {
          this.node.container.appendChild(this.node.details);
        } else {
          this.node.details.remove();
        }
      });
      
      // Assembling DOM
      this.node.container.append(
        this.node.name,
        this.node.age,
        this.node.button
      );
    }
  }
};
```

#### Flexible Reactive System

SimpleJS's reactive system combines the best aspects of various frameworks, providing flexible data binding methods:

```javascript
// Vue-style reactivity
const state = reactive({
  count: 0,
  user: { name: 'John' }
});

// React-style state hooks
const [count, setCount] = useState(0);

// SimpleJS signal system - combining advantages of both
const count = signal(0);
const user = signal({ name: 'John' });

// Computed values
const doubleCount = compute(() => count.value * 2);
const fullName = compute(() => `${user.value.firstName} ${user.value.lastName}`);

// Reactive data flow
const activeUsers = flow(users)
  .filter(user => user.status === 'active')
  .map(user => ({ 
    id: user.id, 
    displayName: user.name
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

// DOM binding
bind(count, counterElement, 'textContent', count => `Count: ${count}`);
```

<a name="progressive-learning-path"></a>
### Progressive Learning Path

SimpleJS provides a progressive learning experience, from simple to complex, allowing developers to master the framework's powerful features step by step:

#### Beginner Level (1-2 days)

Beginners can quickly build basic applications with minimal framework knowledge:

```javascript
// Simple counter application
const Counter = {
  data: {
    count: signal(0),
    increment() {
      this.count.update(c => c + 1);
    },
    decrement() {
      this.count.update(c => Math.max(0, c - 1));
    }
  },
  
  render() {
    return element('div', { class: 'counter' }, [
      element('h2', {}, 'Simple Counter'),
      element('p', {}, () => `Count: ${this.data.count.value}`),
      element('button', { 
        onClick: () => this.data.decrement(),
        class: 'btn-decrement'
      }, 'Decrease'),
      element('button', { 
        onClick: () => this.data.increment(),
        class: 'btn-increment'
      }, 'Increase')
    ]);
  }
};

// Mount the component to the DOM
mount(Counter, document.getElementById('app'));
```

#### Intermediate Level (1-2 weeks)

Build more complex applications with state management and components:

```javascript
// User profile component with data fetching
const UserProfile = {
  data: {
    user: signal(null),
    loading: signal(true),
    error: signal(null),
    
    async fetchUser(id) {
      try {
        this.loading.set(true);
        this.error.set(null);
        const response = await fetch(`/api/users/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        this.user.set(data);
      } catch (err) {
        this.error.set(err.message);
      } finally {
        this.loading.set(false);
      }
    }
  },
  
  node: {
    container: element('div', { class: 'user-profile' }),
    loading: element('div', { class: 'loading-indicator' }, 'Loading...'),
    error: element('div', { class: 'error-message' }),
    profileCard: element('div', { class: 'profile-card' }),
    avatar: element('img', { class: 'avatar' }),
    name: element('h2', { class: 'name' }),
    email: element('p', { class: 'email' }),
    bio: element('p', { class: 'bio' })
  },
  
  action: {
    onCreate() {
      // Handle loading state
      this.watch(this.data.loading, (loading) => {
        if (loading) {
          this.node.loading.style.display = 'block';
          this.node.profileCard.style.display = 'none';
          this.node.error.style.display = 'none';
        } else {
          this.node.loading.style.display = 'none';
          
          if (this.data.error.value) {
            this.node.error.style.display = 'block';
            this.node.profileCard.style.display = 'none';
          } else {
            this.node.profileCard.style.display = 'block';
            this.node.error.style.display = 'none';
          }
        }
      });
      
      // Handle error state
      this.watch(this.data.error, (error) => {
        if (error) {
          this.node.error.textContent = error;
        }
      });
      
      // Data binding
      this.watch(this.data.user, (user) => {
        if (user) {
          this.node.avatar.src = user.avatarUrl;
          this.node.name.textContent = user.name;
          this.node.email.textContent = user.email;
          this.node.bio.textContent = user.bio || 'No bio available';
        }
      });
      
      // Build DOM structure
      this.node.profileCard.append(
        this.node.avatar,
        this.node.name,
        this.node.email,
        this.node.bio
      );
      
      this.node.container.append(
        this.node.loading,
        this.node.error,
        this.node.profileCard
      );
      
      // Fetch user data on creation
      this.data.fetchUser(this.props.userId);
    }
  }
};
```

#### Advanced Level (2-4 weeks)

Master complex patterns, build sophisticated applications:

```javascript
// Advanced data table component with sorting, filtering and pagination
const DataTable = {
  data: {
    items: signal([]),
    filteredItems: compute(() => {
      return this.applyFilters(this.items.value);
    }),
    paginatedItems: compute(() => {
      const start = (this.pagination.value.page - 1) * this.pagination.value.pageSize;
      return this.filteredItems.value.slice(
        start,
        start + this.pagination.value.pageSize
      );
    }),
    pagination: signal({
      page: 1,
      pageSize: 10,
      total: 0
    }),
    sorting: signal({
      field: 'id',
      direction: 'asc'
    }),
    filters: signal({}),
    
    // Data processing methods
    applyFilters(items) {
      let result = [...items];
      const filters = this.filters.value;
      
      // Apply filters
      Object.keys(filters).forEach(field => {
        const filterValue = filters[field];
        if (filterValue) {
          result = result.filter(item => {
            return String(item[field]).toLowerCase()
              .includes(String(filterValue).toLowerCase());
          });
        }
      });
      
      // Apply sorting
      const { field, direction } = this.sorting.value;
      result.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];
        return direction === 'asc' 
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });
      
      return result;
    },
    
    // Pagination methods
    setPage(page) {
      this.pagination.update(p => ({ ...p, page }));
    },
    
    // Sorting methods
    setSorting(field) {
      this.sorting.update(s => ({
        field,
        direction: s.field === field && s.direction === 'asc' ? 'desc' : 'asc'
      }));
    },
    
    // Data loading
    async loadData() {
      this.loading.set(true);
      try {
        const response = await fetch('/api/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: this.pagination.value.page,
            pageSize: this.pagination.value.pageSize,
            sort: this.sorting.value,
            filters: this.filters.value
          })
        });
        
        const data = await response.json();
        this.items.set(data.items);
        this.pagination.update(p => ({
          ...p,
          total: data.total
        }));
      } catch (error) {
        this.error.set('Failed to load data');
      } finally {
        this.loading.set(false);
      }
    }
  },
  
  // Component implementation continues with rendering logic...
};
```

## 跨框架兼容性

SimpleJS提供全面的跨框架兼容层，可以与Vue、React、Angular等主流框架无缝集成，实现平滑迁移和混合开发：

### 在SimpleJS中使用Vue组件

```javascript
import { mountVueComponent } from 'simplejs/adapters/vue';
import VueCalendar from 'vue-calendar-component';

// 在SimpleJS组件中使用Vue组件
const EventPlanner = {
  data: {
    events: signal([
      { date: '2023-05-15', title: '团队会议' },
      { date: '2023-05-20', title: '产品发布' }
    ]),
    selectedDate: signal(null),
    
    addEvent(date, title) {
      this.events.update(currentEvents => [
        ...currentEvents,
        { date, title }
      ]);
    }
  },
  
  node: {
    container: element('div', { class: 'event-planner' }),
    calendarContainer: element('div', { class: 'calendar-wrapper' }),
    eventList: element('div', { class: 'event-list' }),
    eventForm: element('form', { class: 'event-form' }),
    titleInput: element('input', { 
      type: 'text',
      placeholder: '事件标题',
      class: 'event-title-input'
    }),
    submitButton: element('button', { 
      type: 'submit',
      class: 'submit-button'
    }, '添加事件')
  },
  
  action: {
    onCreate() {
      // 挂载Vue日历组件
      this.vueCalendar = mountVueComponent(VueCalendar, {
        target: this.node.calendarContainer,
        props: {
          events: this.data.events.value,
          onDateSelect: (date) => {
            this.data.selectedDate.set(date);
          }
        },
        // 建立信号与Vue组件的同步
        sync: {
          from: [
            { signal: this.data.events, prop: 'events' }
          ],
          to: [
            { prop: 'selectedDate', signal: this.data.selectedDate }
          ]
        }
      });
      
      // 事件表单处理
      this.node.eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = this.node.titleInput.value.trim();
        const date = this.data.selectedDate.value;
        
        if (title && date) {
          this.data.addEvent(date, title);
          this.node.titleInput.value = '';
        }
      });
      
      // 显示事件列表
      this.watch(this.data.events, (events) => {
        this.renderEventList(events);
      });
      
      // 组装DOM
      this.node.eventForm.append(
        this.node.titleInput,
        this.node.submitButton
      );
      
      this.node.container.append(
        this.node.calendarContainer,
        this.node.eventList,
        this.node.eventForm
      );
    },
    
    // 渲染事件列表
    renderEventList(events) {
      this.node.eventList.innerHTML = '';
      
      if (events.length === 0) {
        this.node.eventList.textContent = '暂无事件';
        return;
      }
      
      // 按日期分组
      const eventsByDate = events.reduce((acc, event) => {
        if (!acc[event.date]) {
          acc[event.date] = [];
        }
        acc[event.date].push(event);
        return acc;
      }, {});
      
      // 渲染分组事件
      Object.keys(eventsByDate).forEach(date => {
        const dateEvents = eventsByDate[date];
        
        const dateGroup = element('div', { class: 'event-date-group' });
        const dateHeading = element('h3', { class: 'date-heading' }, date);
        dateGroup.appendChild(dateHeading);
        
        const eventItems = element('ul', { class: 'event-items' });
        dateEvents.forEach(event => {
          const eventItem = element('li', { class: 'event-item' }, event.title);
          eventItems.appendChild(eventItem);
        });
        
        dateGroup.appendChild(eventItems);
        this.node.eventList.appendChild(dateGroup);
      });
    },
    
    onDestroy() {
      // 清理Vue组件
      if (this.vueCalendar) {
        this.vueCalendar.unmount();
      }
    }
  }
};
```

### 在Vue中使用SimpleJS组件

```vue
<template>
  <div class="vue-container">
    <h2>SimpleJS组件在Vue中的使用</h2>
    
    <!-- SimpleJS组件包装器 -->
    <SimpleJSComponent 
      :component="DataFlowChart"
      :props="chartProps"
      @chart-click="handleChartClick"
    />
    
    <div class="selected-info" v-if="selectedItem">
      已选择: {{ selectedItem.name }} - {{ selectedItem.value }}
    </div>
    
    <!-- 数据控制 -->
    <div class="controls">
      <button @click="addDataPoint">添加数据点</button>
      <button @click="clearData">清空数据</button>
      <label>
        主题:
        <select v-model="chartProps.theme">
          <option value="light">浅色</option>
          <option value="dark">深色</option>
          <option value="colorful">多彩</option>
        </select>
      </label>
    </div>
  </div>
</template>

<script>
import { SimpleJSComponent } from 'simplejs/adapters/vue';
import { DataFlowChart } from '../simplejs-components/DataFlowChart';

export default {
  components: {
    SimpleJSComponent
  },
  
  data() {
    return {
      rawData: [
        { id: 1, label: '销售', count: 145 },
        { id: 2, label: '营销', count: 87 },
        { id: 3, label: '研发', count: 210 },
        { id: 4, label: '客服', count: 65 }
      ],
      chartProps: {
        data: [],
        theme: 'light',
        animated: true,
        height: 400
      },
      selectedItem: null
    };
  },
  
  created() {
    this.chartProps.data = this.processData();
  },
  
  methods: {
    processData() {
      return this.rawData.map(item => ({
        id: item.id,
        name: item.label,
        value: item.count,
        color: this.getColor(item.count)
      }));
    },
    
    handleChartClick(item) {
      this.selectedItem = item;
      this.$emit('item-selected', item);
    },
    
    getColor(value) {
      return value > 100 ? '#ff5722' : '#4caf50';
    },
    
    addDataPoint() {
      const id = Math.max(0, ...this.rawData.map(d => d.id)) + 1;
      this.rawData.push({
        id,
        label: `数据${id}`,
        count: Math.floor(Math.random() * 200) + 20
      });
      
      this.chartProps.data = this.processData();
    },
    
    clearData() {
      this.rawData = [];
      this.chartProps.data = [];
      this.selectedItem = null;
    }
  }
};
</script>
```

### 在React中使用SimpleJS组件

```jsx
import React, { useState, useEffect } from 'react';
import { SimpleJSComponent } from 'simplejs/adapters/react';
import { UserDashboard } from '../simplejs-components/UserDashboard';

const DashboardPage = () => {
  const [userData, setUserData] = useState({
    name: 'React用户',
    role: '开发者',
    projects: [
      { id: 1, name: '项目A', status: 'active' },
      { id: 2, name: '项目B', status: 'completed' }
    ],
    activities: [
      { id: 1, type: 'comment', content: '评论了项目A', time: '2小时前' },
      { id: 2, type: 'commit', content: '提交了代码到项目B', time: '昨天' }
    ]
  });
  
  const [notifications, setNotifications] = useState([]);
  
  // 模拟获取通知
  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() > 0.7) {
        setNotifications(prev => [
          {
            id: Date.now(),
            content: `新通知 ${prev.length + 1}`,
            time: new Date().toLocaleTimeString()
          },
          ...prev
        ]);
      }
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);
  
  // 处理来自SimpleJS组件的事件
  const handleProjectSelect = (project) => {
    console.log('项目被选择:', project);
    // 处理项目选择逻辑
  };
  
  return (
    <div className="dashboard-container">
      <h1>用户仪表盘</h1>
      
      {/* SimpleJS组件集成 */}
      <SimpleJSComponent
        component={UserDashboard}
        props={{
          user: userData,
          notifications: notifications,
          onProjectSelect: handleProjectSelect
        }}
        // 设置双向数据流
        bindToState={{
          notifications: {
            value: notifications,
            setter: setNotifications
          }
        }}
      />
      
      {/* React UI部分 */}
      <div className="react-controls">
        <button onClick={() => {
          setUserData(prev => ({
            ...prev,
            projects: [
              ...prev.projects,
              {
                id: prev.projects.length + 1,
                name: `新项目 ${prev.projects.length + 1}`,
                status: 'planning'
              }
            ]
          }));
        }}>
          添加项目
        </button>
        
        <button onClick={() => {
          setNotifications([]);
        }}>
          清除通知
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
```

## 增强的开发体验

SimpleJS专注于提供卓越的开发者体验，通过丰富的工具和功能使开发流程更加高效和愉悦：

### 智能开发工具

SimpleJS生态系统包含一系列专业开发工具，加速开发流程：

#### SimpleJS DevTools

浏览器扩展，为开发者提供深入的应用洞察：

- **组件树检查**：可视化组件层次结构和属性
- **信号追踪**：实时监控信号值变化和依赖关系
- **时间旅行调试**：记录状态变化，在时间线上前进后退
- **性能分析**：识别性能瓶颈和优化机会
- **网络监控**：追踪API请求和响应
- **存储检查**：检查本地存储和会话存储
- **自定义事件监听**：跟踪自定义事件触发和处理

#### IDE集成

为主流IDE提供专业插件支持：

- **VS Code插件**：
  - 智能语法高亮
  - 代码补全和提示
  - 组件导航和引用查找
  - 代码片段
  - 内联文档
  - 重构工具
  - 内置调试器

- **WebStorm/IntelliJ插件**：
  - 高级语法感知
  - 智能重构
  - 意图操作
  - 内联错误检测
  - 带环境感知的调试工具

### 智能AI辅助开发

SimpleJS集成了先进的AI开发助手，加速开发流程：

```javascript
// AI辅助代码生成
// 只需描述你需要的组件功能

// @ai-generate: "创建一个用户资料表单，包含姓名、邮箱和头像上传"
const UserProfileForm = {
  data: {
    user: signal({
      name: '',
      email: '',
      avatar: null
    }),
    validationErrors: signal({}),
    isSubmitting: signal(false),
    
    validateForm() {
      const errors = {};
      const user = this.user.value;
      
      if (!user.name.trim()) {
        errors.name = '姓名不能为空';
      }
      
      if (!user.email.trim()) {
        errors.email = '邮箱不能为空';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        errors.email = '邮箱格式不正确';
      }
      
      this.validationErrors.set(errors);
      return Object.keys(errors).length === 0;
    },
    
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }
      
      this.isSubmitting.set(true);
      try {
        // 模拟API请求
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 提交成功处理
        notificationService.success('资料已更新');
      } catch (error) {
        notificationService.error('提交失败，请重试');
      } finally {
        this.isSubmitting.set(false);
      }
    }
  },
  
  node: {
    // AI生成的表单节点结构
    form: element('form', { class: 'profile-form' }),
    nameField: inputGroup('姓名', 'text'),
    emailField: inputGroup('邮箱', 'email'),
    avatarUpload: fileUploader('头像', ['image/jpeg', 'image/png'], {
      maxSize: 5 * 1024 * 1024, // 5MB
      crop: true
    }),
    submitButton: element('button', { 
      type: 'submit',
      class: 'btn btn-primary'
    }, '保存')
  },
  
  action: {
    onCreate() {
      // 字段绑定
      this.bind(this.data.user, 'name', this.node.nameField.input, 'value');
      this.bind(this.data.user, 'email', this.node.emailField.input, 'value');
      
      // 错误处理
      this.watch(this.data.validationErrors, errors => {
        // 显示姓名错误
        if (errors.name) {
          this.node.nameField.showError(errors.name);
        } else {
          this.node.nameField.hideError();
        }
        
        // 显示邮箱错误
        if (errors.email) {
          this.node.emailField.showError(errors.email);
        } else {
          this.node.emailField.hideError();
        }
      });
      
      // 头像上传处理
      this.node.avatarUpload.onImageSelect(file => {
        const reader = new FileReader();
        reader.onload = e => {
          this.data.user.update(user => ({
            ...user,
            avatar: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      });
      
      // 提交处理
      this.node.form.addEventListener('submit', e => {
        e.preventDefault();
        this.data.submitForm();
      });
      
      // 加载状态处理
      this.watch(this.data.isSubmitting, isSubmitting => {
        this.node.submitButton.disabled = isSubmitting;
        this.node.submitButton.textContent = isSubmitting ? '保存中...' : '保存';
      });
      
      // 组装表单
      this.node.form.append(
        this.node.nameField.container,
        this.node.emailField.container,
        this.node.avatarUpload.container,
        this.node.submitButton
      );
    }
  }
};
```

### 生产力功能

SimpleJS提供多种生产力功能，加快开发速度：

#### 代码生成器

```bash
# 创建新组件
sjs generate component UserProfile

# 创建页面组件
sjs generate page Dashboard

# 创建服务
sjs generate service AuthService

# 创建自定义钩子
sjs generate hook useWindowSize
```

#### 项目模板

```bash
# 创建企业级项目
sjs create my-enterprise-app --template enterprise

# 创建电商项目
sjs create my-shop --template ecommerce

# 创建管理后台
sjs create admin-panel --template admin-dashboard

# 创建博客
sjs create my-blog --template blog
```

#### 快速原型工具

```bash
# 启动快速原型环境
sjs prototype

# 导出原型为项目
sjs prototype export my-project
```

## 安全性与最佳实践

SimpleJS将安全性作为核心设计原则，提供全面的安全防护机制：

### 自动XSS防护

SimpleJS提供多层次的XSS防护，确保应用安全：

```javascript
// 自动上下文感知的输出编码
const ProfileCard = {
  data: {
    user: signal({
      name: 'John<script>alert("XSS")</script>', // 潜在的XSS载荷
      bio: '<b>Web开发者</b>',
      website: 'https://example.com'
    })
  },
  
  render() {
    return element('div', { class: 'profile' }, [
      // 文本内容自动编码，安全显示用户输入
      element('h2', {}, this.data.user.value.name), // 自动编码，显示为纯文本
      
      // 链接安全处理
      element('a', { 
        href: safeURL(this.data.user.value.website), // URL安全检查
        rel: 'noopener noreferrer',
        target: '_blank'
      }, '访问网站'),
      
      // 安全的HTML渲染，经过严格消毒处理
      element('div', {}, [
        safeHTML(this.data.user.value.bio, {
          allowedTags: ['b', 'i', 'em', 'strong'],
          allowedAttributes: {} // 不允许任何属性
        })
      ])
    ]);
  }
};
```

### CSRF防护

SimpleJS提供内置的CSRF防护机制：

```javascript
// API服务配置
const apiService = createAPIService({
  baseURL: '/api',
  csrf: {
    enabled: true,
    headerName: 'X-CSRF-Token',
    cookieName: 'csrf-token',
    refreshEndpoint: '/csrf/refresh'
  }
});

// 自动处理CSRF令牌
apiService.post('/users', userData);
```

### 内容安全策略

SimpleJS支持内容安全策略(CSP)配置：

```javascript
// 应用配置
const app = createApp({
  // CSP配置
  contentSecurityPolicy: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'wasm-unsafe-eval'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', 'blob:'],
    'font-src': ["'self'"],
    'connect-src': ["'self'", 'https://api.example.com'],
    'worker-src': ["'self'", 'blob:'],
    'report-uri': '/csp-report'
  }
});
```

### 安全状态管理

SimpleJS提供安全的状态管理功能：

```javascript
// 敏感数据处理
const userProfile = signal({
  username: 'user123',
  email: 'user@example.com'
}, {
  // 敏感字段不持久化到本地存储
  persist: {
    enabled: true,
    key: 'user-profile',
    exclude: ['email', 'phone', 'address']
  },
  
  // 敏感字段不包含在日志中
  logging: {
    exclude: ['email', 'phone', 'password']
  }
});

// 加密持久化存储
const secureStorage = createSecureStorage({
  key: 'user-sensitive-data',
  algorithm: 'AES-GCM',
  encryptionKey: derivedKey // 从用户密码派生
});

// 安全存储敏感信息
secureStorage.set('paymentDetails', {
  cardNumber: '4111111111111111',
  cvv: '123'
});
```

### 安全审计工具

SimpleJS提供内置的安全审计工具：

```javascript
// 开发工具命令
sjs audit security

// 输出示例:
// [警告] 发现3个潜在安全问题:
// 1. 组件 'UserProfile' 使用了不安全的 innerHTML
// 2. 服务 'PaymentService' 未使用 HTTPS
// 3. 表单 'LoginForm' 缺少CSRF保护
```

### 用户输入验证

SimpleJS提供强大的输入验证功能：

```javascript
// 表单验证
const registrationForm = {
  data: {
    formData: signal({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }),
    
    // 验证规则
    validationRules: {
      username: [
        { rule: 'required', message: '用户名不能为空' },
        { rule: 'minLength', value: 3, message: '用户名至少3个字符' },
        { rule: 'pattern', value: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' }
      ],
      email: [
        { rule: 'required', message: '邮箱不能为空' },
        { rule: 'email', message: '邮箱格式不正确' }
      ],
      password: [
        { rule: 'required', message: '密码不能为空' },
        { rule: 'minLength', value: 8, message: '密码至少8个字符' },
        { rule: 'pattern', value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: '密码必须包含大小写字母和数字' }
      ],
      confirmPassword: [
        { rule: 'required', message: '请确认密码' },
        { rule: 'equals', field: 'password', message: '两次密码输入不一致' }
      ]
    },
    
    // 验证状态
    validation: signal({
      errors: {},
      dirty: {},
      valid: false
    }),
    
    // 验证方法
    validate(field) {
      const value = this.formData.value[field];
      const rules = this.validationRules[field];
      
      // 标记字段为已修改
      this.validation.update(v => ({
        ...v,
        dirty: {
          ...v.dirty,
          [field]: true
        }
      }));
      
      // 验证字段
      for (const rule of rules) {
        let valid = true;
        
        switch (rule.rule) {
          case 'required':
            valid = value.trim() !== '';
            break;
          case 'minLength':
            valid = value.length >= rule.value;
            break;
          case 'pattern':
            valid = rule.value.test(value);
            break;
          case 'email':
            valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            break;
          case 'equals':
            valid = value === this.formData.value[rule.field];
            break;
        }
        
        if (!valid) {
          this.setFieldError(field, rule.message);
          return false;
        }
      }
      
      // 验证通过，清除错误
      this.clearFieldError(field);
      return true;
    },
    
    // 设置字段错误
    setFieldError(field, message) {
      this.validation.update(v => ({
        ...v,
        errors: {
          ...v.errors,
          [field]: message
        },
        valid: false
      }));
    },
    
    // 清除字段错误
    clearFieldError(field) {
      this.validation.update(v => {
        const errors = {...v.errors};
        delete errors[field];
        
        return {
          ...v,
          errors,
          valid: Object.keys(errors).length === 0
        };
      });
    },
    
    // 验证所有字段
    validateAll() {
      let allValid = true;
      
      Object.keys(this.validationRules).forEach(field => {
        const fieldValid = this.validate(field);
        allValid = allValid && fieldValid;
      });
      
      return allValid;
    },
    
    // 提交表单
    submitForm() {
      if (this.validateAll()) {
        // 表单验证通过，可以安全提交
        console.log('表单数据:', this.formData.value);
      }
    }
  },
  
  // 视图和行为略...
};
```

## 性能优化与监控

SimpleJS提供全面的性能优化策略和监控工具，确保应用始终保持最佳性能：

### 自动性能优化

SimpleJS内置多种性能优化策略，无需开发者手动干预：

```javascript
// 创建应用时启用优化选项
const app = createApp({
  // 性能优化配置
  optimization: {
    // 静态提升 - 静态内容只创建一次
    staticHoisting: true,
    
    // 条件渲染优化
    conditionalRendering: {
      caching: true,  // 缓存条件分支
      lazyEvaluation: true // 延迟计算未显示分支
    },
    
    // 列表渲染优化
    listRendering: {
      recycling: true, // DOM节点回收复用
      windowing: true  // 自动虚拟列表（仅渲染可见项）
    },
    
    // 更新优化
    updateOptimization: {
      batchUpdates: true, // 批量更新
      prioritization: true // 优先级更新（UI阻塞操作延迟）
    },
    
    // 代码分割
    codeSplitting: {
      auto: true, // 自动分析和分割代码
      prefetch: 'viewport' // 视口内资源预加载
    }
  }
});
```

### 内存管理

SimpleJS提供先进的内存管理机制，防止内存泄漏：

```javascript
// 信号自动清理
const ProfilePage = {
  data: {
    // 用户离开页面时自动取消订阅和清理
    userProfile: signal(null, { 
      autoDispose: true,
      disposeDelay: 60000 // 延迟1分钟再清理（以便返回）
    }),
    
    subscriptions: [],
    
    fetchProfile(id) {
      // 自动管理API订阅
      const subscription = api.profile(id).subscribe(data => {
        this.userProfile.set(data);
      });
      
      // 注册清理
      this.subscriptions.push(subscription);
    }
  },
  
  action: {
    // 页面销毁时清理资源
    onDestroy() {
      // 取消所有API订阅
      this.subscriptions.forEach(sub => sub.unsubscribe());
      this.subscriptions = [];
      
      // 主动清理大型资源
      this.userProfile.dispose();
    }
  }
};
```

### 综合性能监控

SimpleJS提供全面的性能监控功能，实时监测应用性能：

```javascript
// 性能监控配置
const app = createApp({
  // 启用性能监控
  performance: {
    // Web Vitals监控
    webVitals: {
      enabled: true,
      reportTo: 'https://analytics.example.com/vitals'
    },
    
    // 关键指标监控
    metrics: ['FP', 'FCP', 'LCP', 'TTI', 'CLS', 'FID'],
    
    // 自定义性能标记和指标
    custom: {
      dataLoadTime: {
        description: '数据加载时间',
        start: 'data-fetch-start',
        end: 'data-fetch-complete'
      },
      renderTime: {
        description: '渲染耗时',
        start: 'render-start',
        end: 'render-complete'
      }
    },
    
    // 性能预算
    budgets: {
      LCP: 2500, // 最大内容绘制 2.5秒
      FID: 100,  // 首次输入延迟 100ms
      CLS: 0.1,  // 累积布局偏移 0.1
      TTI: 3500, // 可交互时间 3.5秒
      
      // 打包体积预算
      bundles: {
        total: 300, // 总体积不超过300KB
        initial: 120, // 初始加载不超过120KB
        async: 80    // 异步模块不超过80KB
      }
    },
    
    // 自动性能报告
    reporting: {
      console: true, // 开发模式下控制台输出
      beacons: true, // 发送性能信标
      errorThreshold: true // 性能超出预算时报错
    }
  }
});

// 添加性能标记
performance.mark('data-fetch-start');
await fetchData();
performance.mark('data-fetch-complete');

// 手动测量性能
performance.measure('data-loading', 'data-fetch-start', 'data-fetch-complete');
```

### 可视化性能工具

SimpleJS DevTools提供强大的性能分析工具：

- **性能时间线**：可视化展示应用各阶段性能
- **组件渲染热图**：识别高频重渲染组件
- **信号依赖图**：分析信号依赖关系和更新链
- **网络瀑布图**：监控API请求性能
- **内存使用分析**：识别内存泄漏和大型对象
- **CPU使用率**：展示CPU使用峰值和瓶颈
- **资源使用统计**：分析资源加载和使用情况

### 自动优化建议

SimpleJS提供智能性能优化建议：

```bash
# 运行性能审计
sjs audit performance

# 输出示例:
# [性能建议] 发现5个性能优化机会:
# 1. 组件 'UserList' 频繁重渲染，建议使用memo包装
# 2. 信号 'userSettings' 依赖链过长，建议拆分
# 3. 图片 'hero.jpg' 未优化，建议压缩（可节省1.2MB）
# 4. 存在3个未使用的组件导入，增加了32KB包体积
# 5. API 'getUserData' 耗时超过3秒，建议添加缓存
```

## 快速开始

### 安装

```bash
# 安装CLI工具
npm install -g sjs-cli

# 创建新项目
sjs create my-project
# 选择模板: [Basic|企业级|电商|管理后台|博客]

# 进入项目目录
cd my-project

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 项目结构

```
my-project/
 ├── public/              # 静态资源
 ├── src/
 │    ├── flows/          # 流式组件
 │    ├── signals/        # 共享信号
 │    ├── dna/            # DNA组件
 │    ├── adapters/       # 平台适配器
 │    ├── transforms/     # 数据变换
 │    ├── pages/          # 页面组件
 │    ├── components/     # 通用组件
 │    ├── services/       # 业务服务
 │    ├── utils/          # 工具函数
 │    ├── styles/         # 全局样式
 │    ├── router/         # 路由配置
 │    ├── store/          # 状态管理
 │    ├── app.sjs         # 应用入口
 │    └── main.js         # 启动文件
 ├── tests/               # 测试文件
 ├── sjs.config.js        # 框架配置
 └── package.json
```

## 社区与生态

SimpleJS拥有活跃的社区和丰富的生态系统：

### 组件库

- **SimpleJS UI**: 官方UI组件库，提供100+高质量组件
- **SimpleJS Pro**: 企业级组件集，包含表格、图表、表单等高级组件
- **SimpleJS Mobile**: 移动端组件库，针对触摸交互优化
- **第三方社区组件**: 社区贡献的主题和专用组件

### 插件系统

- **状态管理**: 高级状态管理插件，支持中心化和去中心化方案
- **路由**: 客户端路由、服务端路由和静态站点生成
- **国际化**: 多语言支持，包含20+语言包
- **表单**: 高级表单处理，包含验证、向导和动态表单
- **认证**: 用户认证和授权系统，支持多种认证方式
- **API**: REST和GraphQL客户端，自动数据同步
- **动画**: 高性能动画系统，支持关键帧和基于物理的动画

## 企业级支持

SimpleJS为企业用户提供全面的支持和服务：

- **技术支持**: 专业技术支持，快速解决问题
- **培训课程**: 定制化培训课程，帮助团队快速上手
- **性能优化**: 专业性能优化服务，提升应用性能
- **架构咨询**: 针对大型应用的架构设计和技术选型咨询
- **安全审计**: 代码安全审计和安全最佳实践建议
- **升级服务**: 平滑升级服务，确保版本升级不影响业务

## 贡献指南

SimpleJS是一个开源项目，我们欢迎并感谢社区贡献。以下是参与贡献的指导原则：

### 行为准则

SimpleJS项目采用贡献者公约（Contributor Covenant）作为行为准则，我们期望所有参与者遵守这些准则。不当行为将不被容忍。

### 贡献方式

您可以通过多种方式参与贡献：

- **提交Bug报告**：帮助我们发现并修复问题
- **功能建议**：提出新功能和改进建议
- **改进文档**：修正、完善或翻译文档
- **提交代码**：修复bug或实现新功能
- **创建教程**：编写教程或最佳实践指南
- **回答问题**：在论坛和社区中帮助其他开发者

### 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/simplejs/framework.git
cd framework

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行测试
npm test

# 构建项目
npm run build
```

### 代码风格指南

SimpleJS项目遵循以下代码风格规范：

```javascript
// 使用2个空格缩进
function example() {
  const value = true;
  
  // 使用驼峰命名法
  function calculateValue() {
    return value;
  }
  
  // 优先使用const和let
  const result = calculateValue();
  let counter = 0;
  
  // 使用模板字符串
  return `结果是: ${result}`;
}
```

我们使用ESLint和Prettier强制执行代码风格，提交前请确保代码通过lint检查：

```bash
# 运行代码风格检查
npm run lint

# 自动修复风格问题
npm run lint:fix
```

### 提交规范

我们使用约定式提交（Conventional Commits）规范：

```
<类型>[可选的作用域]: <描述>

[可选的正文]

[可选的脚注]
```

提交类型包括：
- **feat**: 新功能
- **fix**: 错误修复
- **docs**: 文档更新
- **style**: 代码风格调整
- **refactor**: 代码重构
- **perf**: 性能优化
- **test**: 添加或修改测试
- **build**: 构建系统或外部依赖变更
- **ci**: CI配置变更
- **chore**: 其他变更

示例：
```
feat(signal): 添加信号批处理功能

添加批量更新信号功能，显著提升大量信号同时更新时的性能。

关闭 #123
```

### Pull Request流程

1. 从主分支创建功能分支
2. 进行必要的更改
3. 确保代码通过测试和lint检查
4. 提交PR并填写详细描述
5. 等待代码审查并处理反馈

### 版本发布流程

SimpleJS使用语义化版本控制（Semantic Versioning）：

- **主版本号**：不兼容的API变更
- **次版本号**：向后兼容的功能新增
- **修订号**：向后兼容的问题修复

### 社区开发路线图

我们维护公开的开发路线图，帮助贡献者了解项目的发展方向：

- **短期目标**：未来3个月的计划
- **中期目标**：未来6-12个月的计划
- **长期愿景**：项目的长期方向

贡献者可以在GitHub讨论区提出建议和看法。

### 社区项目展示

我们鼓励开发者分享使用SimpleJS构建的项目，优秀的项目将被展示在官方网站：

- 提交项目展示可以通过GitHub讨论区
- 包含项目描述、截图和GitHub链接
- 特别欢迎开源项目和教育资源

## 加入社区

- 官方网站: https://simplejs.dev
- GitHub: https://github.com/simplejs/framework
- 文档: https://docs.simplejs.dev
- 交流论坛: https://forum.simplejs.dev
- Discord: https://discord.gg/simplejs
- 微信群: 扫描官网二维码加入
- QQ群: 123456789

## 许可证

MIT

---

<a name="license"></a>
### License

MIT

---

<p align="center">Build modern, efficient, and maintainable web applications with SimpleJS</p>

<a name="community-ecosystem"></a>
### Community and Ecosystem

The SimpleJS ecosystem is growing with a variety of tools, plugins, and extensions:

#### Official Packages

| Package | Description |
|---------|-------------|
| `simplejs-router` | Official routing solution with code-splitting support |
| `simplejs-store` | State management with time-travel debugging |
| `simplejs-test` | Testing utilities with component testing helpers |
| `simplejs-dev-tools` | Chrome and Firefox developer tools extension |
| `simplejs-ssg` | Static site generation toolkit |
| `simplejs-i18n` | Internationalization and localization |

#### Popular Community Extensions

| Extension | Description |
|-----------|-------------|
| `simplejs-forms` | Form validation and dynamic form building |
| `simplejs-motion` | Animation and transition system |
| `simplejs-ui` | Component library with 50+ UI elements |
| `simplejs-query` | Data fetching and caching utilities |
| `simplejs-auth` | Authentication patterns and helpers |
| `simplejs-pwa` | Progressive web app utilities |

#### Learning Resources

- [Official Documentation](https://docs.simplejs.org)
- [API Reference](https://api.simplejs.org)
- [Examples Repository](https://github.com/simplejs/examples)
- [Community Tutorials](https://tutorials.simplejs.org)
- [Video Courses](https://courses.simplejs.org)
- [SimpleJS Podcast](https://podcast.simplejs.org)

<a name="enterprise-support"></a>
### Enterprise Support

SimpleJS offers dedicated enterprise-level support to ensure your applications remain performant, secure, and maintainable:

#### Enterprise Features

- **Priority Support**: Direct access to the core team with SLA-backed response times
- **Security Audits**: Regular code audits and vulnerability assessments
- **Dedicated Consulting**: Implementation guidance and architecture reviews
- **Extended Long-term Support**: Maintenance and updates for older versions
- **Custom Development**: Tailored features and integrations
- **Training Programs**: Personalized team training and workshops

#### Compliance Features

SimpleJS helps meet compliance requirements for various regulations:

```javascript
// Enable GDPR compliance tools
SimpleJS.enableCompliance({
  gdpr: {
    cookieConsent: true,
    dataRetention: {
      enabled: true,
      defaultPeriod: '13months'
    },
    dataExport: {
      format: 'json',
      includeMetadata: true
    },
    rightToBeForgotten: true
  },
  
  // HIPAA compliance (for healthcare applications)
  hipaa: {
    encryption: {
      atRest: true,
      inTransit: true,
      level: 'AES-256'
    },
    audit: {
      enabled: true,
      events: ['access', 'modification', 'deletion'],
      retention: '6years'
    },
    authentication: {
      mfa: true,
      sessionTimeout: '15minutes'
    }
  }
});
```

#### For more information

Contact the enterprise sales team at [enterprise@simplejs.org](mailto:enterprise@simplejs.org) or visit [simplejs.org/enterprise](https://simplejs.org/enterprise).

<a name="contribution-guidelines"></a>
### Contribution Guidelines

We welcome contributions to SimpleJS! Here's how you can help:

#### Development Workflow

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/simplejs.git`
3. Create a branch: `git checkout -b feature/amazing-feature`
4. Make your changes
5. Run tests: `npm test`
6. Commit changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a pull request

#### Coding Standards

SimpleJS follows specific coding conventions:

```javascript
// ✅ Good
function goodExample() {
  // Use const for variables that won't be reassigned
  const config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000
  };
  
  // Use let for variables that will change
  let retries = 0;
  
  // Proper error handling
  try {
    return fetchData(config);
  } catch (error) {
    logError(error);
    return null;
  }
}

// ❌ Avoid
function badExample() {
  // Don't use var
  var config = { url: 'https://api.example.com' };
  
  // Avoid reassigning parameters
  config = { ...config, timeout: 5000 };
  
  // Don't ignore errors
  return fetchData(config);
}
```

#### Types of Contributions

- **Code**: Bug fixes, new features, performance improvements
- **Documentation**: Corrections, examples, tutorials
- **Tests**: Unit tests, integration tests, test improvements
- **Issues**: Bug reports, feature suggestions
- **Reviews**: Code reviews for pull requests

#### Commit Message Format

SimpleJS uses conventional commits:

```
type(scope): short description

[optional body]

[optional footer]
```

Examples:
- `feat(router): add support for nested routes`
- `fix(renderer): correct attribute handling in SVG elements`
- `docs(api): update documentation for reactive signals`
- `perf(core): optimize virtual DOM diffing algorithm`

---

## License

SimpleJS is available under the MIT License. See the LICENSE file for more information.