const { Schema, model } = require('mongoose');
const { reminderSchema } = require('./Reminder');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  reminders: [reminderSchema],
});

module.exports.User = model('User', userSchema);
module.exports.userSchema = userSchema;
