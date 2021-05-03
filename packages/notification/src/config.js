export default {
  isProduction: process.env.NODE_ENV === 'production',
  port: process.env.PORT ? parseInt(process.env.PORT) : 3004,
  sentry_dsn: process.env.SENTRY_DSN,
  knex: {
    client: 'pg',
    version: '13',
    connection: {
      database: 'notification',
      user: 'notification-worker',
    },
  },
}
