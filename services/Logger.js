const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: `${__dirname}/../logs/error.log`, level: 'error' }),
    new winston.transports.File({ filename: `${__dirname}/../logs/translations.log`, level: 'info' }),
    new winston.transports.File({ filename: `${__dirname}/../logs/combined.log`, level: 'debug' })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    level: 'debug',
    format: winston.format.json()
  }))
}

module.exports = logger
