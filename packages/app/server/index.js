const express = require('express');
const request = require('request');

const app = express();

app.get(['/', '/static/*'], (req, res, next) => {
  request(`http://localhost:8080${req.url}`)
    .on('response', (response) => response.pipe(res))
});

app.listen(3000, () => {
  console.info(`
    ------------------------------
    🌍  GOTO http://localhost:3000
    ------------------------------
  `);
})
