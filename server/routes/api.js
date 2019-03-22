const express = require('express');
const authConfig = require('../config/auth');
const remindersControllers = require('../controllers/reminders');

const mainApiRouter = express.Router();

mainApiRouter.get('/users/:email/reminders',
  authConfig.checkJwt,
  authConfig.getUserInfo,
  remindersControllers.getAllRemindersForUser);

mainApiRouter.post('/users/:email/reminders/',
  authConfig.checkJwt,
  authConfig.getUserInfo,
  remindersControllers.createReminderForUser);

mainApiRouter.patch('/users/:email/reminders/:reminderId',
  authConfig.checkJwt,
  authConfig.getUserInfo,
  remindersControllers.updateReminderForUser);

mainApiRouter.delete('/users/:email/reminders/:reminderId',
  authConfig.checkJwt,
  authConfig.getUserInfo,
  remindersControllers.deleteReminderForUser);

module.exports = mainApiRouter;
