const express = require('express');
const authConfig = require('../config/auth');
const remindersControllers = require('../controllers/reminders');

const mainApiRouter = express.Router();

// This route doesn't need authentication
mainApiRouter.get('/public',
  remindersControllers.publicRoute);

// This route need authentication
mainApiRouter.get('/private',
  authConfig.checkJwt,
  authConfig.getUserInfo,
  remindersControllers.privateRoute);

// This route needs authentication and user must be scoped
mainApiRouter.get('/private-scoped',
  authConfig.checkJwt,
  authConfig.getUserInfo,
  remindersControllers.privateScopedRoute);

// This route should use authorization, it should only return results if
// getUserInfo matches the /:email req.params (we don't want other users getting your
// private reminders)
mainApiRouter.get('/users/:email/reminders',
  remindersControllers.getAllRemindersForUser);

mainApiRouter.post('/users/:email/reminders/',
  remindersControllers.createReminderForUser);

mainApiRouter.patch('/users/:email/reminders/:reminderId',
  remindersControllers.updateReminderForUser);

mainApiRouter.delete('/users/:email/reminders/:reminderId',
  remindersControllers.deleteReminderForUser);

module.exports = mainApiRouter;
