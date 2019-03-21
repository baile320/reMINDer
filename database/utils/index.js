module.exports.updateReminderById = (id, cols) => {
  // Setup static beginning of query
  const query = ['UPDATE reminders'];
  query.push('SET');

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  const set = [];
  Object.keys(cols).forEach((key, i) => {
    set.push(`${key} = ($${i + 1})`);
  });
  query.push(set.join(', '));

  // Add the WHERE statement to look up by id
  query.push(`WHERE id = ${id}`);

  // Return a complete query string
  return query.join(' ');
};
