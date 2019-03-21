const mainApiRouter = require('./api');

module.exports = (app) => {
  app.use('/api', mainApiRouter);
};
