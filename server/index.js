const schedule = require('node-schedule');
const dotenv = require('dotenv');

dotenv.config();

const app = require('./app');
const db = require('../database/index.js');
const sendTodaysQuotes = require('./utils/emailer');

const apiPort = process.env.API_PORT || 8080;

app.listen(apiPort, async () => {
  console.log(`reMINDer API listening on port ${apiPort}!`);
  db;
});

// run email scheduler every day at midnight
schedule.scheduleJob('0 0 * * *', () => {
  sendTodaysQuotes();
});
