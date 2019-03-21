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
