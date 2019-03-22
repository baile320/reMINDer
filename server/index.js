const app = require('./app');
const db = require('../database/index.js');

const port = process.env.PORT || 8081;

app.listen(port, async () => {
  console.log(`reMINDer API listening on port ${port}!`);
  db;
});
