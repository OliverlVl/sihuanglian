import dataFormat from './data';
import constant from './constant'

let storage = window.localStorage;
const USER_INFO_KEY = constant.USER_INFO_KEY;
const PREFIX = constant.LOCAL_STORAGE_PREFIX;
const systemApi = {
  getObjectValue: function (name, defaultValue) {
    let t = storage.getItem(PREFIX + name);
    return dataFormat.isNull(t) ? defaultValue : dataFormat.toJSONObject(t);
  },
  getIntValue: function (name, defaultValue) {
    let t = this.getValue(name, defaultValue);
    return dataFormat.toInt(t);
  },
  // 获取数据
  getValue: function (name, defaultValue) {
    let t = storage.getItem(PREFIX + name);
    return dataFormat.isNull(t) ? defaultValue : t;
  },
  // 设置数据
  setValue: function (name, value) {
    storage.setItem(PREFIX + name, value);
  },
  remove: function (name) {
    storage.removeItem(PREFIX + name)
  },
  getUserInfo: function () {
    return this.getValue(USER_INFO_KEY, {});
  },
  setUserInfo: function (data) {
    return this.setValue(USER_INFO_KEY, data);
  },
  isProduction: function () {
    return (process.env['NODE_ENV'] || '') !== 'development';
  },
  isAndroid: (/android/gi).test(navigator.appVersion),
  isIPhone: (/iphone|ipad/gi).test(navigator.appVersion),
  isIPhoneX: () => {
    let u = navigator.userAgent;
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    if (isIOS) {
      if (screen.height === 812 && screen.width === 375) {
        return true;
      }
    }
    return false;
  }
};

export default systemApi;
