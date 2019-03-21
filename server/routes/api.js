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

mainApiRouter.get('/reminders/:email',
  remindersControllers.getAllReminders);
module.exports = mainApiRouter;
