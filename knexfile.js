module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.POSTGRES_DB || 'reminders',
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || '',
    },
  },
  test: {
    client: 'postgresql',
    connection: {
      database: 'reminders_test',
      user: 'postgres',
      password: '',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      database: process.env.POSTGRES_DB || 'reminders',
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || '',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
