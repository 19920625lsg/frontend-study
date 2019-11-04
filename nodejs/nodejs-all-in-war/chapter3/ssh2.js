// http://blog.csdn.net/laputa73/article/details/61427605
// shell模式（多个命令交互）
let Client = require('ssh2').Client;

let conn = new Client();
conn.on('ready', function() {
    console.log('Client :: ready');
    conn.shell(function(err, stream) {
        if (err) throw err;
        stream.on('close', function() {
            console.log('Stream :: close');
            conn.end();
        }).on('data', function(data) {
            console.log('STDOUT: ' + data);
        }).stderr.on('data', function(data) {
            console.log('STDERR: ' + data);
        });
        stream.end('cd test\nls -l\nexit\n');
    });
}).connect({
    host: '10.102.26.103',
    port: 22,
    username: 'root',
    password: '123456'
});