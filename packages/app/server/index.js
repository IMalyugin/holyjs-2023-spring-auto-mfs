const express = require('express');
const request = require('request');
const { discoverBonjourPort } = require('./discovery');
const app = express();

app.get(['/', '/static/*'], (req, res, next) => {
  request(`http://localhost:8080${req.url}`)
    .on('response', (response) => response.pipe(res))
});

app.get(['/mfs/:name/:version/*'], (req, res, next) => {
  const { name } = req.params;
  const relativeUrl = req.url.split('/').slice(4).join('/');
  const port = discoverBonjourPort(name);
  request(`http://localhost:${port}/${relativeUrl}`)
    .on('response', (response) => response.pipe(res))
});

app.listen(3000, () => {
  console.info(`
    ------------------------------
    🌍  GOTO http://localhost:3000
    ------------------------------
  `);
})
