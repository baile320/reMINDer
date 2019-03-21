const app = require('./app');
const knex = require('../database/knex.js');

const port = process.env.PORT || 8081;

app.listen(port, async () => {
  console.log(`reMINDer API listening on port ${port}!`);
});
