const mongoose = require('mongoose');
const { User } = require('../../database/models/User');

mongoose.Promise = global.Promise;

exports.getAllRemindersForUser = async (req, res) => {
  try {
    const user = { email: req.params.email };
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
    const user = { email: req.params.email };
    const result = await User.findOneAndUpdate(user,
      { $push: { reminders: req.body } },
      { new: true });
    res.json(result);
  } catch (e) {
    console.log(e);
  }
};

exports.updateReminderForUser = async (req, res) => {
  try {
    await User.findOne({ email: req.params.email }, async (err, user) => {
      const subDoc = user.reminders.id(req.params.reminderId);
      subDoc.set({ ...req.body, updatedAt: new Date() });
      return user.save();
    });
    const result = await User.findOneAndUpdate({ email: req.params.email }, {}, { new: true });
    res.json(result);
  } catch (e) {
    console.log(e);
  }
};

exports.deleteReminderForUser = async (req, res) => {
  try {
    const user = { email: req.params.email };
    const { reminderId } = req.params;
    const result = await User.updateOne(user, { $pull: { reminders: { _id: reminderId } } });
    res.json(result);
  } catch (e) {
    console.log(e);
  }
};

exports.getRemindersForEmailer = async (email, lt) => {
  try {
    const result = await User.aggregate([
      { $match: { email } },
      { $unwind: '$reminders' },
      { $match: { 'reminders.lastSent': { $lt: new Date(lt) } } },
      { $group: { _id: '$_id', reminders: { $push: '$reminders' } } },
    ]);
    // emails are unique, so we only need first item in the returned array
    return result[0].reminders;
  } catch (e) {
    return e;
  }
};

exports.updateForEmailer = async (email, reminderId, updates) => {
  try {
    const result = await User.findOne({ email }, async (err, user) => {
      const subDoc = user.reminders.id(reminderId);
      console.log(subDoc);
      subDoc.set({ ...updates });
      return user.save();
    });
    return result;
  } catch (e) {
    return e;
  }
};

exports.getUsersForEmailer = async () => {
  try {
    const result = await User.find();
    return result;
  } catch (e) {
    return e;
  }
};
