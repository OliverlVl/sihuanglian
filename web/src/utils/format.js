/**
 * 数据格式处理
 * @type {{}}
 */
const formatUtils = {
    formatTime: function (time) {
        return this.formatDateTime(time, 'yyyy-MM-dd hh:mm:ss');
    },
    formatDate: function (time) {
        return this.formatDateTime(time, 'yyyy-MM-dd');
    },
    // 日期格式转换
    formatDateTime: function (time, cFormat) {
        if (time === undefined || time.length === 0 || time === 0) {
            return null;
        }
        let format = cFormat || '{y}-{m}-{d} {h}:{m}:{s}';
        let date;
        if (typeof time === 'object') {
            date = time;
        } else {
            if (('' + time).length === 10) {
                time = parseInt(time) * 1000;
            }
            date = new Date(time);
        }
        const o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            'S': date.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + ''));
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return format;
    },
    formatBeautifyTime: function (time, format) {
        if (('' + time).length === 10) {
            time = parseInt(time) * 1000;
        }
        if (time === 0) {
            return '';
        }
        const d = new Date(time);
        const now = Date.now();
        const diff = (now - d) / 1000;
        if (diff < 30) {
            return '刚刚';
        } else if (diff < 3600) { // less 1 hour
            return Math.ceil(diff / 60) + '分钟前';
        } else if (diff < 3600 * 24) {
            return Math.ceil(diff / 3600) + '小时前';
        } else if (diff < 3600 * 24 * 2) {
            return '1天前';
        }
        if (format === undefined || format === '') {
            format = 'yyyy年MM月dd日 HH时mm分';
        }
        return this.formatDateTime(time, format);
    },
    toInt: function (tmp) {
        try {
            tmp = parseInt(tmp);
            if (tmp === Number.NaN) {
                return 0;
            }
            return tmp;
        } catch (e) {
            return 0;
        }
    },
    toFloat: function (tmp) {
        try {
            tmp = parseFloat(tmp);
            if (tmp === Number.NaN) {
                return 0;
            }
            return tmp;
        } catch (e) {
            return 0;
        }
    },
    formatFloat: function (number, fixed) {
        try {
            let tmp = this.toFloat(number);
            return tmp.toFixed(fixed);
        } catch (e) {
            return number;
        }
    },
    mapTransfer: function (itemKey, map, blank) {
        for (let item of this.map) {
            if (item.value === itemKey) {
                return item.text;
            }
        }
        return blank;
    }
};

export default formatUtils;
