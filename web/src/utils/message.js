import {Message, MessageBox, Loading} from 'element-ui';

const DURATION = 5000;
const LOADING_OPTIONS = {
  lock: 'true'
}
let loading;
const messageUtils = {
  showMessage: showMessage,
  showInfo,
  showSuccess,
  showWarning,
  showError,
  alert,
  showSimpleConfirm,
  startLoading,
  endLoading
};

export function startLoading () {
  loading = Loading.service(LOADING_OPTIONS);
}

export function endLoading () {
  if (loading !== undefined) {
    loading.close();
  }
}

export function showMessage (type, message) {
  Message({
    message: message,
    type: type,
    showClose: true,
    duration: DURATION
  });
}

export function showInfo (message) {
  showMessage('info', message);
}

export function showSuccess (message) {
  showMessage('success', message);
}

export function showWarning (message) {
  showMessage('warning', message);
}

export function showError (message) {
  showMessage('error', message);
}

export function alert (msg, title = '提示', callback) {
  MessageBox.alert(msg, title, {
    confirmButtonText: '确定',
    callback: action => {
      if (callback) {
        callback();
      }
    }
  })
}

export function showSimpleConfirm (msg, confirm, cancel) {
  MessageBox.confirm(msg, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    if (confirm === undefined) {
      this.showSuccess('已确认操作');
    } else {
      confirm();
    }
  }).catch((e) => {
    console.error(e);
    if (cancel === undefined) {
      this.showMessage('info', '已取消操作');
    } else {
      cancel();
    }
  });
}

export default messageUtils;
