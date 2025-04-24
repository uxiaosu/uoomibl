// 模拟Tauri窗口API
export const appWindow = {
  close() {
    console.log('模拟窗口关闭');
  },
  minimize() {
    console.log('模拟窗口最小化');
  },
  maximize() {
    console.log('模拟窗口最大化');
    this._maximized = true;
  },
  unmaximize() {
    console.log('模拟窗口取消最大化');
    this._maximized = false;
  },
  isMaximized() {
    return Promise.resolve(this._maximized || false);
  },
  _maximized: false
}; 