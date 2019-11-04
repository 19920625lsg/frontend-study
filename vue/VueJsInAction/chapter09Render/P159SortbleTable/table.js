Vue.component('vTable', {
    props: {
        columns: {
            type: Array,
            default: function () {
                return [];
            }
        },
        data: function () {
            return {
                currentColumns: [],
                currentData: []
            }
        }
    },
    methods: {
        makeColumns: function () {
            this.currentColumns = this.columns.map(function (col, index) {

            })
        }
    }
});