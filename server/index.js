const app = require('./app');
const { db } = require('../database/');

const port = process.env.PORT || 8081;

app.listen(port, async () => {
  console.log(`reMINDer API listening on port ${port}!`);
  db.connect()
    .then(() => console.log('Connected to Postgres'))
    .catch(err => console.error('connection error', err.stack));
});
