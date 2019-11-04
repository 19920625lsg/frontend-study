import React from 'react';
import {Select} from 'antd'

const Option = Select.Option;
// 工具类
export default {
    formatDate(time) {
        if (!time) {
            // 时间戳为空就返回空
            return '';
        }
        let date = new Date(time);
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " "
            + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    },

    pagination(data, callback) {
        console.log(data);
        // 构造page对象
        let page = {
            onChange: (current) => {
                callback(current)
            },
            current: data.result.page,
            pageSize: data.result.page_size,
            total: data.result.total_count,
            showTotal: () => {
                return `共${data.result.total_count}条`
            },
            // 显示跳转文本框(Goto)
            showQuickJumper: true
        };
        return page;
    },
    getOptionList(data) {
        if (!data) {
            return [];
        }
        let options = []; //[<Option value="0" key="all_key">全部</Option>];
        data.map((item) => {
            return options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        });
        return options;
    },
    updateSelectedItem(selectedRowKeys, selectedItem, selectedIds) {
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedItem,
                selectedIds
            })
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem
            })
        }
    }
}
