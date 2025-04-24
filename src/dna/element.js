 // SimpleJS DOM 元素创建与操作
import { watch } from '../signals/index.js';

export function element(tagName, attributes = {}, children = []) {
  const el = document.createElement(tagName);
  
  // 处理属性
  Object.entries(attributes).forEach(([key, value]) => {
    if (key.startsWith('on') && typeof value === 'function') {
      // 事件处理
      const eventName = key.substring(2).toLowerCase();
      el.addEventListener(eventName, value);
    } else if (typeof value === 'function') {
      // 动态属性
      watch(value, newValue => {
        el.setAttribute(key, newValue);
      });
    } else {
      // 静态属性
      el.setAttribute(key, value);
    }
  });
  
  // 处理子元素
  if (Array.isArray(children)) {
    children.forEach(child => {
      appendChild(el, child);
    });
  } else if (children !== null && children !== undefined) {
    appendChild(el, children);
  }
  
  return el;
}

function appendChild(parent, child) {
  if (child === null || child === undefined) return;
  
  if (typeof child === 'function') {
    // 处理动态内容
    const textNode = document.createTextNode('');
    parent.appendChild(textNode);
    
    watch(child, value => {
      textNode.textContent = value;
    });
  } else if (typeof child === 'string' || typeof child === 'number') {
    // 处理文本内容
    parent.appendChild(document.createTextNode(child));
  } else if (child instanceof Node) {
    // 处理DOM节点
    parent.appendChild(child);
  } else if (typeof child === 'boolean') {
    // 忽略布尔值
  } else if (Array.isArray(child)) {
    // 处理数组
    child.forEach(subChild => appendChild(parent, subChild));
  } else {
    // 其他类型转为字符串
    parent.appendChild(document.createTextNode(String(child)));
  }
}

export function bind(signal, element, property, transform = value => value) {
  return watch(signal, value => {
    const transformedValue = transform(value);
    if (property in element) {
      element[property] = transformedValue;
    } else {
      element.setAttribute(property, transformedValue);
    }
  });
}

export function safeHTML(html, options = {}) {
  const div = document.createElement('div');
  div.innerHTML = html;
  
  // 简单的HTML清理
  const allowedTags = options.allowedTags || ['b', 'i', 'em', 'strong', 'span', 'a'];
  const allowedAttrs = options.allowedAttributes || {
    'a': ['href', 'target']
  };
  
  function sanitizeNode(node) {
    if (node.nodeType === 3) return; // 文本节点不处理
    
    // 元素节点处理
    if (node.nodeType === 1) {
      const tagName = node.tagName.toLowerCase();
      
      // 清理不允许的标签
      if (!allowedTags.includes(tagName)) {
        const text = document.createTextNode(node.textContent);
        node.parentNode.replaceChild(text, node);
        return;
      }
      
      // 清理属性
      const attrs = [...node.attributes];
      attrs.forEach(attr => {
        const attrName = attr.name;
        const allowedForTag = allowedAttrs[tagName] || [];
        
        if (!allowedForTag.includes(attrName)) {
          node.removeAttribute(attrName);
        }
      });
    }
    
    // 处理子节点
    [...node.childNodes].forEach(sanitizeNode);
  }
  
  sanitizeNode(div);
  return div.innerHTML;
}

export function safeURL(url) {
  if (!url) return '#';
  
  try {
    const urlObj = new URL(url, window.location.origin);
    // 只允许http和https协议
    if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
      return url;
    }
    return '#';
  } catch (e) {
    return '#';
  }
}