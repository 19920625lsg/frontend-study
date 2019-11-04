Vue.component('tabs', {
    template: '' +
    '<div class="tabs">\n' +
    '    <div class="tabs-bar">\n' +
    '        <!--标签页标题，这里要用v-for-->\n' +
    '        <div :class="tabCls(item)" v-for="(item,index) in navList" @click="handleChange(index)"></div>' +
    '    </div>\n' +
    '    <div class="tabs-content">\n' +
    '        <!--这里的slot就是嵌套的pane-->\n' +
    '        <slot></slot>\n' +
    '    </div>\n' +
    '</div>',
    data: function () {
        return {
            currentValue: this.value,
            // 用于渲染tabs的标题
            navList: []
        }
    },
    props: {
        value: {
            type: [String, Number]
        }
    },
    methods: {
        tabCls: function (item) {
            return [
                'tabs-tab',
                {
                    'tabs-tab-active': item.name === this.currentValue
                }
            ]

        },
        getTabs: function () {
            // 通过遍历子组件，得到所有的pane组件
            return this.$children.filter(function (item) {
                return item.$options.name === 'pane';
            });
        },
        updateNav: function () {
            this.navList = [];
            // 设置对this的引用，在function回调里，this指向的并不是Vue实例
            var _this = this;
            this.getTabs().forEach(function (pane, index) {
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                });
                // 如果没有给pane设置name，默认设置它的索引
                if (!pane.name) {
                    pane.name = index;
                }
                // 设置当前选中的tab索引
                if (index === 0) {
                    if (!_this.currentValue) {
                        _this.currentValue = pane.name || index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus: function () {
            var tabs = this.getTabs();
            var _this = this;
            // 显示当前选中的tab对应的pane组件，隐藏没有选中地
            tabs.forEach(function (tab) {
                return tab.show = tab.name === _this.currentValue;
            });
        },
        handleChange: function (index) {
            var nav = this.navList[index];
            var name = nav.name;
            this.currentValue = name;
            this.$emit('input', name);
            this.$emit('on-click', name);
        }
    },
    watch: {
        value: function (val) {
            this.currentValue = val;
        },
        currentValue: function () {
            this.updateStatus();
        }
    }
});