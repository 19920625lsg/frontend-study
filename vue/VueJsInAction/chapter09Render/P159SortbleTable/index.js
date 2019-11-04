var app = new Vue({
    el: '#app',
    data: {
        columns: [
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '年龄',
                key: 'age',
                sortable: true
            }
        ],
        data: [
            {
                name: '王小明',
                age: 18,
                birthday: '1999-02-21',
                address: '北京市朝阳区三里屯'
            }
        ]
    }
});