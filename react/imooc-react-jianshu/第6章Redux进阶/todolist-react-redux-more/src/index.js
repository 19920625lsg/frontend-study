import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';
import {Provider} from 'react-redux'
import store from './store'

const App = (
    // 这个store必须写上哦，Provider会把store提供给Provider包含在内的所有元素
    <Provider store={store}>
        <TodoList/>
    </Provider>
);

ReactDOM.render(App, document.getElementById('root'));
