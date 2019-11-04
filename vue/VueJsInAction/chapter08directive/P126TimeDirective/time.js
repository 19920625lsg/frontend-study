var Time = {
    // 获取当前的时间戳
    getUnix: function () {
        var date = new Date();
        return date.getTime();
    },

    // 获取今天0时0分0秒的时间戳
    getTodayUnix: function () {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },

    // 获取见年1月1日0时0分0秒的时间戳
    getYearUnux: function () {
        var date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },

    // 获取标准年月日
    getLastDate: function (time) {
        var date = new Date(time);
        // 个位数的月份前面需要加0
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + month + '-' + day;
    },

    // 转换时间
    getFormatTime: function (timestamp) {
        var now = this.getUnix();  // 当前时间戳
        var today = this.getTodayUnix();
        var year = this.getYearUnux();
        // 转化为秒级时间戳
        var timer = (now - timestamp) / 1000;
        var tip = '';
        if (timer <= 0) {
            tip = '刚刚';
        } else if (Math.floor(timer / 60) <= 0) {
            tip = '刚刚';
        } else if (timer < 3600) {
            tip = Math.floor(timer / 60) + '分钟前';
        } else if (timer >= 3600 && (timer - today >= 0)) {
            tip = Math.floor(timer / 3600) + '小时前';
        } else if (timer / 86400 <= 31) {
            tip = Math.floor(timer / 86400) + '天前';
        } else {
            tip = this.getLastDate(timestamp);
        }

        return tip;
    }
};

Vue.directive('time', {
    bind: function (el, binding) {
        el.innerHTML = Time.getFormatTime(binding.value);
        el.__timeout__ = setInterval(function () {
            el.innerHTML = Time.getFormatTime(binding.value);
        }, 60000);
    },
    unbind: function (e) {
        // 清除定时器
        clearInterval(el.__timeout__);
        delete el.__timeout__;
    }
});