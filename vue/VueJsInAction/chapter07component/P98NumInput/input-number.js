function isValueNumber(value) {
    return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
}

Vue.component('input-number', {
    template: '' +
    '<div class="input-number">\n' +
    '    <input type="text" :value="currentValue" @change="handleChange">\n' +
    '    <button @click="handleDown" :disabled="currentValue <= min">-</button>\n' +
    '    <button @click="handleUp" :disabled="currentValue >= max">+</button>\n' +
    '</div>',
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data: function () {
        return {
            // 父元素data中的属性
            currentValue: this.value
        }
    },
    watch: {
        // 向父元素更新
        currentValue: function (val) {
            this.$emit('input', val);
            this.$emit('on-change', val);
        },
        // 从父组件获取
        value: function (val) {
            this.updateValue(val);
        }
    },
    methods: {
        updateValue: function (val) {
            if (val > this.max) {
                val = this.max;
            }
            if (val < this.min) {
                val = this.min;
            }
            this.currentValue = val;
        },
        handleDown: function () {
            if (this.currentValue <= this.min) {
                return;
            }
            this.currentValue -= 1;
        },
        handleUp: function () {
            if (this.currentValue >= this.max) {
                return;
            }
            this.currentValue += 1;
        },
        handleChange: function () {
            var val = event.target.value.trim();
            var max = this.max;
            var min = this.min;
            if (isValueNumber(val)) {
                val = Number(val);
                this.currentValue = val;
                if (val > max) {
                    this.currentValue = max;
                } else if (val < min) {
                    this.currentValue = min;
                }
            } else {
                event.target.value = this.currentValue;
            }

        }
    },
    mounted: function () {
        this.updateValue(this.value);
    }
});