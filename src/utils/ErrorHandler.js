// 全局错误处理工具

/**
 * 创建错误通知元素
 * @param {string} message 错误消息
 * @param {string} type 错误类型 (error, warning, info)
 * @returns {HTMLElement} 错误通知元素
 */
function createErrorElement(message, details = '', type = 'error') {
  const container = document.createElement('div');
  container.className = `error-notification ${type}`;
  container.style.position = 'fixed';
  container.style.top = '10px';
  container.style.right = '10px';
  container.style.zIndex = '9999';
  container.style.minWidth = '300px';
  container.style.maxWidth = '450px';
  container.style.padding = '12px 16px';
  container.style.borderRadius = '6px';
  container.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  container.style.animation = 'error-notification-slide 0.3s ease-out';
  
  // 根据类型设置样式
  if (type === 'error') {
    container.style.backgroundColor = '#FFF1F0';
    container.style.border = '1px solid #FFA39E';
    container.style.color = '#CF1322';
  } else if (type === 'warning') {
    container.style.backgroundColor = '#FFFBE6';
    container.style.border = '1px solid #FFE58F';
    container.style.color = '#D4B106';
  } else if (type === 'info') {
    container.style.backgroundColor = '#E6F7FF';
    container.style.border = '1px solid #91D5FF';
    container.style.color = '#1890FF';
  }
  
  // 标题
  const title = document.createElement('div');
  title.style.fontWeight = 'bold';
  title.style.marginBottom = '8px';
  title.style.display = 'flex';
  title.style.justifyContent = 'space-between';
  title.style.alignItems = 'center';
  
  const titleText = document.createElement('span');
  titleText.textContent = type === 'error' ? '错误' : type === 'warning' ? '警告' : '信息';
  
  const closeButton = document.createElement('span');
  closeButton.textContent = '×';
  closeButton.style.cursor = 'pointer';
  closeButton.style.marginLeft = '10px';
  closeButton.style.fontSize = '16px';
  closeButton.onclick = () => {
    document.body.removeChild(container);
  };
  
  title.appendChild(titleText);
  title.appendChild(closeButton);
  container.appendChild(title);
  
  // 消息内容
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.style.marginBottom = details ? '8px' : '0';
  container.appendChild(messageElement);
  
  // 详细信息（可折叠）
  if (details) {
    const detailsContainer = document.createElement('div');
    detailsContainer.style.marginTop = '8px';
    
    const detailsToggle = document.createElement('a');
    detailsToggle.href = '#';
    detailsToggle.textContent = '显示详情';
    detailsToggle.style.color = 'inherit';
    detailsToggle.style.textDecoration = 'underline';
    detailsToggle.style.fontSize = '12px';
    
    const detailsContent = document.createElement('pre');
    detailsContent.textContent = details;
    detailsContent.style.marginTop = '8px';
    detailsContent.style.padding = '8px';
    detailsContent.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
    detailsContent.style.borderRadius = '4px';
    detailsContent.style.overflow = 'auto';
    detailsContent.style.maxHeight = '150px';
    detailsContent.style.fontSize = '12px';
    detailsContent.style.display = 'none';
    
    detailsToggle.onclick = (e) => {
      e.preventDefault();
      if (detailsContent.style.display === 'none') {
        detailsContent.style.display = 'block';
        detailsToggle.textContent = '隐藏详情';
      } else {
        detailsContent.style.display = 'none';
        detailsToggle.textContent = '显示详情';
      }
    };
    
    detailsContainer.appendChild(detailsToggle);
    detailsContainer.appendChild(detailsContent);
    container.appendChild(detailsContainer);
  }
  
  // 添加自动关闭定时器
  setTimeout(() => {
    if (document.body.contains(container)) {
      // 添加淡出动画
      container.style.animation = 'error-notification-fade 0.3s ease-out forwards';
      setTimeout(() => {
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
      }, 300);
    }
  }, 5000); // 5秒后自动关闭
  
  return container;
}

// 添加CSS动画
function addAnimationStyles() {
  if (document.getElementById('error-notification-styles')) return;
  
  const styleEl = document.createElement('style');
  styleEl.id = 'error-notification-styles';
  styleEl.textContent = `
    @keyframes error-notification-slide {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes error-notification-fade {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;
  document.head.appendChild(styleEl);
}

/**
 * 显示错误通知
 * @param {string} message 错误消息
 * @param {string} details 详细信息
 */
export function showError(message, details = '') {
  addAnimationStyles();
  const errorElement = createErrorElement(message, details, 'error');
  document.body.appendChild(errorElement);
  console.error(message, details);
}

/**
 * 显示警告通知
 * @param {string} message 警告消息
 * @param {string} details 详细信息
 */
export function showWarning(message, details = '') {
  addAnimationStyles();
  const warningElement = createErrorElement(message, details, 'warning');
  document.body.appendChild(warningElement);
  console.warn(message, details);
}

/**
 * 显示信息通知
 * @param {string} message 信息内容
 * @param {string} details 详细信息
 */
export function showInfo(message, details = '') {
  addAnimationStyles();
  const infoElement = createErrorElement(message, details, 'info');
  document.body.appendChild(infoElement);
  console.info(message, details);
}

/**
 * 注册全局错误处理
 */
export function registerGlobalErrorHandlers() {
  // 全局JS错误
  window.onerror = function(message, source, lineno, colno, error) {
    const errorStack = error ? error.stack : '';
    const details = `位置: ${source}:${lineno}:${colno}\n${errorStack}`;
    showError(`JS错误: ${message}`, details);
    return true; // 防止默认错误处理
  };
  
  // Promise未捕获错误
  window.addEventListener('unhandledrejection', function(event) {
    const error = event.reason;
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : '';
    showError(`未处理的Promise错误: ${message}`, stack);
    event.preventDefault();
  });
  
  // AJAX/Fetch错误
  const originalFetch = window.fetch;
  window.fetch = async function(...args) {
    try {
      const response = await originalFetch(...args);
      if (!response.ok) {
        const url = typeof args[0] === 'string' ? args[0] : args[0].url;
        const message = `API请求失败: ${response.status} ${response.statusText}`;
        const details = `URL: ${url}\n响应: ${await response.text().catch(() => '无法读取响应内容')}`;
        showWarning(message, details);
      }
      return response;
    } catch (error) {
      const url = typeof args[0] === 'string' ? args[0] : args[0].url;
      showError(`网络错误: ${error.message}`, `URL: ${url}\n${error.stack}`);
      throw error;
    }
  };
  
  console.log('全局错误处理器已注册');
}

export default {
  showError,
  showWarning,
  showInfo,
  registerGlobalErrorHandlers
}; 