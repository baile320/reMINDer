const { db } = require('../../database/index');

// This route doesn't need authentication
exports.publicRoute = (req, res) => {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.',
  });
};

// This route need authentication
exports.privateRoute = (req, res) => {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.',
  });
};

exports.privateScopedRoute = (req, res) => {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.',
  });
};

exports.getAllRemindersForUser = async (req, res) => {
  const query = `
  SELECT * FROM reminders AS r
  INNER JOIN users_reminders
    AS u_r
    ON u_r.reminders_id = r.id
  INNER JOIN users
    AS u
    ON u_r.users_id = u.id
  WHERE
    u.email = '${req.params.email}';
  `;

  try {
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.log(err.stack);
  }
};

exports.updateReminderForUser = async (req, res) => {
};

exports.deleteReminderForUser = async (req, res) => {
  const query = `
  DELETE FROM users_reminders as u_r
  USING
    users
      AS u,
    reminders
      AS r
  WHERE u.email = '${req.params.email}'
    AND u_r.reminders_id = '${req.params.reminderId}'
  `;

  try {
    const result = await db.query(query);
    res.json(result);
  } catch (err) {
    console.log(err.stack);
  }
};
