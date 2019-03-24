const schedule = require('node-schedule');

const app = require('./app');
const db = require('../database/index.js');
const sendTodaysQuotes = require('./utils/emailer');

const port = process.env.PORT || 8081;

app.listen(port, async () => {
  console.log(`reMINDer API listening on port ${port}!`);
  db;
});

// run email scheduler every day at midnight
schedule.scheduleJob('0 0 * * *', () => {
  sendTodaysQuotes();
});
