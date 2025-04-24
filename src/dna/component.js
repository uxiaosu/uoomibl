 // SimpleJS DNA 组件系统
import { signal, watch } from '../signals/index.js';

export function createComponent(definition) {
  return function(props = {}) {
    const component = {
      // 内部状态
      _subscriptions: [],
      _mounted: false,
      _destroyed: false,
      
      // 数据层
      data: {},
      
      // 节点层
      node: {},
      
      // 属性
      props: signal(props),
      
      // 方法
      watch(signal, callback) {
        const unsubscribe = watch(signal, callback);
        this._subscriptions.push(unsubscribe);
        return unsubscribe;
      },
      
      bind(source, sourceKey, target, targetKey) {
        const updateTarget = value => {
          if (targetKey in target) {
            target[targetKey] = value[sourceKey];
          } else {
            target.setAttribute(targetKey, value[sourceKey]);
          }
        };
        
        const unsubscribe = this.watch(source, updateTarget);
        return unsubscribe;
      },
      
      mount(container) {
        if (this._mounted) return;
        
        // 初始化数据层
        if (typeof definition.data === 'object') {
          Object.assign(this.data, definition.data);
        } else if (typeof definition.data === 'function') {
          Object.assign(this.data, definition.data.call(this));
        }
        
        // 初始化节点层
        if (typeof definition.node === 'object') {
          Object.assign(this.node, definition.node);
        } else if (typeof definition.node === 'function') {
          Object.assign(this.node, definition.node.call(this));
        }
        
        // 执行创建生命周期
        if (definition.action && definition.action.onCreate) {
          definition.action.onCreate.call(this);
        }
        
        // 监听属性变化
        this.watch(this.props, newProps => {
          if (definition.action && definition.action.onProps) {
            definition.action.onProps.call(this, newProps);
          }
        });
        
        // 添加到容器
        if (container && this.node.container) {
          container.appendChild(this.node.container);
        }
        
        this._mounted = true;
        
        return this;
      },
      
      destroy() {
        if (this._destroyed) return;
        
        // 执行销毁生命周期
        if (definition.action && definition.action.onDestroy) {
          definition.action.onDestroy.call(this);
        }
        
        // 移除DOM
        if (this.node.container && this.node.container.parentNode) {
          this.node.container.parentNode.removeChild(this.node.container);
        }
        
        // 清理订阅
        this._subscriptions.forEach(unsubscribe => unsubscribe());
        this._subscriptions = [];
        
        this._destroyed = true;
      },
      
      updateProps(newProps) {
        this.props.update(current => ({ ...current, ...newProps }));
      }
    };
    
    return component;
  };
}

export function mount(componentFactory, container, props = {}) {
  const component = componentFactory(props);
  component.mount(container);
  return component;
}