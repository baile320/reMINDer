const { updateReminderById } = require('../../database/utils/index');
const db = require('../..//database/knex');

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
    const result = await db.raw(query);
    res.json(result.rows);
  } catch (err) {
    console.log(err.stack);
  }
};

exports.updateReminderForUser = async (req, res) => {
  /**
   * this function isn't dynamic enough. It should:
   *  - be able to handle updating tags
   *    - add new tags if they dont exist in db already
   *    - create the relationship in reminders_tags
   *  - handle updated the updated_at field
   */
  try {
    // insert tags if there are any
    if (req.body.tags !== undefined) {
      const tags = req.body.tags.map(tagName => ({ tag: tagName }));
      await db('tags').insert(tags);
    }
    // update reminders_tags for

    // update reminders
    const query = updateReminderById(req.params.reminderId, req.body);
    const values = Object.values(req.body);

    const result = await db.raw(query, values);
    console.log(query);
    res.json(result);
    res.sendStatus(200);
  } catch (err) {
    console.log(err.stack);
  }
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
    const result = await db.raw(query);
    console.log(query);
    res.json(result.rows);
  } catch (err) {
    console.log(err.stack);
  }
};
