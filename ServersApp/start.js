const exec = require('child_process').exec;
const args = process.argv;
console.log('ttt args', args);
exec(`react-native start --port ${args[2]}`, {cwd: __dirname}, (err, stdout, stderr) => {
  if (err) {
    console.log(`stdout: ${err}`);
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

