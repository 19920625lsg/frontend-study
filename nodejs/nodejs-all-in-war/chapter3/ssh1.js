// http://blog.csdn.net/laputa73/article/details/61427605
// exec(无上下文，远程执行命令)
let Client = require('ssh2').Client;
let conn = new Client();
conn.on('ready', function() {
    // 下面的'ls'即为命令
    conn.exec('ls', function(err, stream) {
        if (err) throw err;
        stream.on('close', function(code, signal) {
            conn.end();
        }).on('data', function(data) {
            console.log('STDOUT: ' + data);
        }).stderr.on('data', function(data) {
            console.log('STDERR: ' + data);
        });
    });
}).connect({
    host: '10.102.26.103',
    port: 22,
    username: 'root',
    password: '123456'
});