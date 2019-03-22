const { model, Schema } = require('mongoose');

const reminderSchema = new Schema({
  body: {
    required: true,
    type: String,
  },
  author: String,
  source: String,
  tags: [String],
  createdAt: {
    default: Date.now,
    type: Date,
  },
  updatedAt: {
    default: Date.now,
    type: Date,
  },
  lastSent: {
    default: Date.now,
    type: Date,
  },
  sentCount: {
    default: 0,
    type: Number,
  },
});

module.exports.Reminder = model('Reminder', reminderSchema);
module.exports.reminderSchema = reminderSchema;
