const dotenv = require('dotenv');
const { createTransport } = require('nodemailer');
const moment = require('moment');

const { getRemindersForEmailer, updateForEmailer, getUsersForEmailer } = require('../controllers/reminders.js');

dotenv.config();

/*
  TODOS:
    - improve the "random" quote selection. is it even random right now?
    IDEAS:
      find 1 - 3 (random) quotes that are:
      - in the bottom 10 rank of sentCount
      - lastSent older than 3 days
    - make more dynamic:
      - should work for all users (at once or in batches)
      - should not require all of the process.env stuff
      - make THREE_DAYS_AGO configurable (add item to schema and a "user config"
      page to the app)
*/

function fetchTodaysQuotes(email, timeframe) {
  // fetch quotes
  return getRemindersForEmailer(email, timeframe)
    .then((allQuotes) => {
      // create quote array to return
      const quotes = [];
      if (allQuotes.length > 0) {
        if (allQuotes.length < 3) {
          quotes.push(allQuotes[0]);
        } else {
          const numQuotes = Math.floor(Math.random() * 3) + 1;
          for (let i = 0; i < numQuotes; i += 1) {
            quotes.push(allQuotes[i]);
          }
        }
        return quotes;
      }
      return [];
    })
    .catch(err => console.log(err));
}

// Send out the quotes
async function sendTodaysQuotes() {
  const transporter = createTransport({
    auth: {
      pass: process.env.reminderPassword,
      user: process.env.reminderEmail,
    },
    service: process.env.service,
  });
  // build out initial mail options
  const today = new Date();
  const formattedDate = `${today.getMonth()}/${today.getDate()}/${today.getFullYear()}`;
  const mailOptions = {
    from: `"reMINDer" <${process.env.reminderEmail}>`,
    subject: `Your Reminder For ${formattedDate}`,
  };
  const THREE_DAYS_AGO = moment(today).add(-3, 'days').toISOString();

  const users = await getUsersForEmailer();
  users.forEach((user) => {
    fetchTodaysQuotes(user.email, THREE_DAYS_AGO)
      .then((quotes) => {
        if (quotes.length === 0) { console.log('Nothing to send'); }
        // format the quotes and send the mail
        if (quotes.length > 0) {
          const html = quotes.map(quote => `<p>${quote.body}<p><p>-- ${quote.author}, ${quote.source}</p>`);
          transporter.sendMail({
            ...mailOptions,
            to: `<${user.email}>`,
            html: html.join('\n'),
          });
          console.log('Daily email sent');
          return quotes;
        }
        return [];
      })
      // update the quotes that were sent
      .then((quotes) => {
        quotes.map((message) => {
          const sentCount = message.sentCount + 1;
          const lastSent = new Date();
          return updateForEmailer(user.email, message._id, { sentCount, lastSent })
            .then(res => res)
            .catch(err => console.log(err));
        });
      })
      .catch(err => console.log(err));
  });
}

module.exports = sendTodaysQuotes;
