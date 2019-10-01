var exec = require('child_process').exec, child;
function child(){
 exec('cat app.js',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
}
 child();