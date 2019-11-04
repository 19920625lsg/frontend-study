import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import PostList from "./PostList";


ReactDOM.render(<PostList/>, document.getElementById('root'));
registerServiceWorker();
