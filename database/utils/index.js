/**
 * Builds a query like:
 * UPDATE table SET col1 = ($1), col2 = ($2), col3 = ($3) WHERE id = 2
 * Optionally, restricts columns updated to array of "allowed" columns
 */
module.exports.updateReminderById = (id, cols, allowed = []) => {
  const query = ['UPDATE reminders'];
  query.push('SET');

  const set = [];
  Object.keys(cols).forEach((key, i) => {
    if (allowed.length === 0) {
      set.push(`${key} = ($${i + 1})`);
    } else {
      // eslint-disable-next-line no-lonely-if
      if (allowed.includes(key)) {
        set.push(`${key} = ($${i + 1})`);
      }
    }
  });
  query.push(set.join(', '));

  query.push(`WHERE id = ${id}`);

  return query.join(' ');
};
