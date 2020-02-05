const express = require('express');
const fetch = require('node-fetch');
const { exec } = require('child_process');
const app = express();
const port = 3000;

const ports = [3000];

app.get('/', async (req, res) => {
  ports.push(ports[ports.length - 1] + 1);
  exec(`node ${__dirname}/ServersApp/start.js ${ports[ports.length - 1]}`, (err, stdout, stderr) => {
    if (err) {
      console.log(`stdout: ${err}`);
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
  const interval = setInterval(() => checkConnection(ports[ports.length - 1], response), 1000);
  function response(port) {
    res.send(`${port}`);
    clearInterval(interval)
  }
});

function checkConnection(port, callback) {
  try {
    fetch(`http://localhost:${port}`);
    callback(port);
  } catch (e) {
  }
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
