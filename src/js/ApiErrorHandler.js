// API错误处理工具
import { showError, showWarning } from '../utils/ErrorHandler.js';

/**
 * 处理Tauri API调用的错误
 * @param {Error} error 错误对象
 * @param {string} context 错误上下文
 */
export function handleTauriError(error, context = '调用后端API') {
  const errorType = error.type || 'GeneralError';
  const errorMessage = error.message || String(error);
  
  switch (errorType) {
    case 'ValidationError':
      showWarning(`输入验证错误 (${context})`, errorMessage);
      break;
    
    case 'IOError':
      showError(`IO错误 (${context})`, errorMessage);
      break;
      
    case 'NetworkError':
      showError(`网络错误 (${context})`, errorMessage);
      break;
      
    default:
      showError(`${context}失败`, errorMessage);
  }
  
  console.error(`API错误 [${errorType}]: ${errorMessage}`);
}

/**
 * 包装Tauri API调用以自动处理错误
 * @param {Function} apiCall 要调用的API函数
 * @param {string} context 错误上下文描述
 * @param {Function} onError 自定义错误处理函数
 * @returns {Function} 包装后的函数
 */
export function withErrorHandling(apiCall, context, onError) {
  return async (...args) => {
    try {
      return await apiCall(...args);
    } catch (error) {
      // 调用自定义错误处理器（如果提供）
      if (onError && typeof onError === 'function') {
        onError(error);
      } else {
        // 否则使用默认处理
        handleTauriError(error, context);
      }
      
      // 重新抛出错误以允许调用者进一步处理
      throw error;
    }
  };
}

/**
 * 向后端发送日志
 * @param {string} level 日志级别
 * @param {string} message 日志消息
 */
export async function logToBackend(level, message) {
  try {
    const { invoke } = await import('@tauri-apps/api/tauri');
    await invoke('log_to_file', { level, message });
  } catch (error) {
    // 仅在开发环境下显示日志错误
    if (process.env.NODE_ENV === 'development') {
      console.warn('无法发送日志到后端:', error);
    }
  }
}

export default {
  handleTauriError,
  withErrorHandling,
  logToBackend
}; 