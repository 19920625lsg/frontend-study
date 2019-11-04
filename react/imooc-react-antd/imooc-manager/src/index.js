import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import MyRouter from "./MyRouter";
// 核心入口
ReactDOM.render(<MyRouter/>, document.getElementById('root'));
registerServiceWorker();
