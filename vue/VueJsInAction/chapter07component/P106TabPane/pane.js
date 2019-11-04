Vue.component('pane', {
    name: 'pane',
    props: {
        name: {
            type: String
        },
        label: {
            type: String,
            default: {
                type: String,
                default: ''
            }
        }
    },
    template: '' +
    '<div class="pane" v-show="show">\n' +
    '    <slot></slot>\n' +
    '</div>',
    data: function () {
        return {
            show: true
        }
    },
    methods: {
        updateNav: function () {
            this.$parent.updateNav();
        }
    },
    watch: {
        label: function () {
            this.updateNav();
        }
    },
    mounted: function () {
        this.updateNav();
    }
});