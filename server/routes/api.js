const express = require('express');
const authConfig = require('../config/auth');
const remindersControllers = require('../controllers/reminders');

const mainApiRouter = express.Router();

mainApiRouter.get('/users/:email/reminders',
  authConfig.checkJwt,
  remindersControllers.getAllRemindersForUser);

mainApiRouter.post('/users/:email/reminders/',
  authConfig.checkJwt,
  remindersControllers.createReminderForUser);

mainApiRouter.patch('/users/:email/reminders/:reminderId',
  authConfig.checkJwt,
  remindersControllers.updateReminderForUser);

mainApiRouter.delete('/users/:email/reminders/:reminderId',
  authConfig.checkJwt,
  remindersControllers.deleteReminderForUser);

module.exports = mainApiRouter;
