const {createLogger, format, transports} = require('winston');
const {winston} = require('../config');
const fs = require('fs');
const path = require('path');

const logDir = 'logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const filename = path.join(logDir, 'craftbook.log');

module.exports = createLogger({
    level: winston.level,
    format: format.combine(
        format.label({label: path.basename(process.mainModule.filename)}),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        })
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(info => `${info.level}: ${info.message}`)
            )
        }),
        new transports.File({
            filename,
            maxsize: 0.5*1024*1024,
            maxFiles: 1,
            tailable: true,
            maxRetries: 1,
            format: format.combine(
                format.printf(info => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`)
            )
        })
    ]
});

