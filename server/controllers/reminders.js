const mongoose = require('mongoose');
const { userSchema, User } = require('../../database/models/User');
const { reminderSchema, Reminder } = require('../../database/models/Reminder');

mongoose.Promise = global.Promise;
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
  try {
    const user = { email: res.locals.user.email };
    const result = await User.findOne(user);

    // if a user was not found, we create one and return it
    let created;
    if (result === null) {
      created = await User.create(new User(user));
      res.json(created);
      return;
    }

    // else we return the result
    res.json(result);
  } catch (e) {
    console.log(e);
  }
};

exports.createReminderForUser = async (req, res) => {
  try {
    const user = { email: res.locals.user.email };
    const result = await User.findOneAndUpdate(user,
      { $push: { reminders: req.body } },
      { returnNewDocument: true });
    res.json(result);
  } catch (e) {
    console.log(e);
  }
};

exports.updateReminderForUser = async (req, res) => {
  try {
    const result = await User.findOne({ email: req.locals.user }, async (err, user) => {
      const subDoc = user.reminders.id(req.params.reminderId);
      subDoc.set({ ...req.body, updatedAt: new Date() });
      return user.save();
    });
    res.json(result);
  } catch (e) {
    console.log(e);
  }
};

exports.deleteReminderForUser = async (req, res) => {
  try {
    const user = { email: res.locals.user.email };
    const { reminderId } = req.params;
    const result = await User.updateOne(user, { $pull: { reminders: { reminderId } } });
    res.json(result);
  } catch (e) {
    console.log(e);
  }
};
