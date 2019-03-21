const app = require('./app');
const { db } = require('../database/');

const port = process.env.PORT || 8081;

app.listen(port, async () => {
  console.log(`reMINDer API listening on port ${port}!`);
  db.connect()
    .then(() => console.log('Connected to Postgres'))
    .catch(err => console.error('connection error', err.stack));

  // delete this stuff, just for testing
  const text = 'select * from users';
  const values = [];
  try {
    const res = await db.query(text, values);
    console.log(res.rows[0]);
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  } catch (err) {
    console.log(err.stack);
  }
});
