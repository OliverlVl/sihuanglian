import Vue from 'vue'
const dataUtils = {
  randomNum: function (min = 0, max = 1000000) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  randomFloat: function (min = 0, max = 1000000) {
    return Math.random() * (max - min) + min;
  },
  getObjectValue: function (obj, key, defaultValue) {
    if (!key) {
      return defaultValue;
    }
    let tmpD = obj;
    let keyList = key.split('.');
    for (let i = 0; i < keyList.length; i++) {
      tmpD = (tmpD || null)[keyList[i]];
      if (this.isNull(tmpD)) {
        return defaultValue;
      }
    }
    return tmpD;
  }, // 获取对象数据 key 层次用.隔开 例如: exact.children
  setObjectValue: function (obj, key, value) {
    if (!key) {
      return obj;
    }
    let tmpD = obj;
    let keyList = key.split('.');
    for (let i = 0; i < keyList.length; i++) {
      if (i === keyList.length - 1) {
        Vue.set(tmpD, keyList[i], value);
      } else {
        if (tmpD[keyList[i]] === undefined) {
          tmpD[keyList[i]] = {}
        }
        tmpD = tmpD[keyList[i]];
      }
    }
  }, // 设置对象数据 key 层次用.隔开 例如: exact.children
  trim (string = '') {
    return string.trim();
  },
  getRandomInt (max = 1000000) {
    return Math.floor(Math.random() * max)
  },
  getRandomString: function (length = 6) {
    let n = length;
    let str = '';
    while (n > 0) {
      str += Math.random().toString(36).substr(2);
      n -= 11;
    }
    return str.substring(0, length);
  },
  getValue: function (value, defaultValue) {
    if (value === undefined) {
      return defaultValue === undefined ? '' : defaultValue;
    }
    return value;
  },
  // 获取字符长度（中文2个字符）
  getByteLen: function (string) {
    let len = 0;
    for (let i = 0; i < string.length; i++) {
      let length = string.charCodeAt(i);
      if (length >= 0 && length <= 128) {
        len += 1;
      } else {
        len += 2;
      }
    }
    return len;
  },
  // 截取字符长度（中文2个字符）
  subByteString: function (string, length) {
    let len = 0;
    for (let i = 0; i < string.length; i++) {
      let code = string.charCodeAt(i);
      if (code >= 0 && code <= 128) {
        len += 1;
      } else {
        len += 2;
      }
      if (len > length) {
        return string.substring(0, i);
      }
    }
    return string;
  },
  arrayIsNull: function (array) {
    if (!this.isNull(array)) {
      if (array.length > 0) {
        return false
      }
    }
    return true;
  },
  // undefined 或 null
  isNull: function (obj) {
    if (obj === undefined || obj == null) {
      return true
    }
    return false
  },
  // 为空
  isEmpty: function (obj) {
    if (obj === undefined || obj == null || '' === obj) {
      return true
    }
    return false
  },
  toJSONObject: function (json) {
    try {
      if (this.isNull(json)) {
        return {}
      }
      return JSON.parse(json);
    } catch (e) {
      console.error(e, json);
      return {};
    }
  },
  toJSONString: function (obj) {
    return JSON.stringify(obj);
  },
  toFormatJSONString: function (obj) {
    return JSON.stringify(obj, null, '\t');
  },
  toInt: function (obj) {
    try {
      let res = parseInt(obj);
      if (isNaN(res)) {
        return undefined;
      }
      return res
    } catch (e) {
      return 0;
    }
  },
  /**
   * html转文本
   * @param {string} val
   * @returns {any}
   */
  html2Text: function (val) {
    const div = document.createElement('div');
    div.innerHTML = val;
    return div.textContent || div.innerText;
  },
  /**
   * 对象合并
   * @param target  a
   * @param source  源
   * @returns {any}
   */
  objectMerge: function (target, source) {
    if (typeof target !== 'object') {
      target = {};
    }
    if (typeof source !== 'object') {
      source = {};
    }
    for (let p in source) {
      try {
        // Property in destination object set; update its value.
        if (source[p].constructor === Object) {
          target[p] = this.objectMerge(target[p], source[p]);
        } else {
          target[p] = source[p];
        }
      } catch (e) {
        // Property in destination object not set; create it and set its value.
        target[p] = source[p];
      }
    }
    return target;
  }
};
export default dataUtils;
