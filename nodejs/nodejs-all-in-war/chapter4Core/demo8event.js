// 事件自定义与触发
const events = require('events');

// 实例化
const myEmitter = new events();
myEmitter.on('classOver', () => {
    console.log("吃饭去!");
});
// 事件触发
myEmitter.emit('classOver');
