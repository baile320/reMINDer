const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const options = { useNewUrlParser: true };

let connString;

if (process.env.NODE_ENV !== 'production') {
  const dbHostName = 'localhost';
  const dbPort = process.env.DB_PORT || 27017;
  const dbDatabaseName = process.env.DB_NAME || 'reminder';
  connString = `mongodb://${dbHostName}:${dbPort}/${dbDatabaseName}`;
} else {
  const dbUrl = process.env.DB_URL;
  connString = `mongodb+srv://${dbUrl}/test?retryWrites=true`;

  const dbHostName = process.env.DB_HOST || 'localhost';
  const dbPassword = process.env.DB_PASS || '';
  options.user = dbHostName;
  options.pass = dbPassword;
}

console.log(connString);
const db = mongoose.connect(connString, options)
  .then(() => console.log('Successfully connected to Mongo'))
  .catch(err => console.log(err));

module.exports.db = db;
