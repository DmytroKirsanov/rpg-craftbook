const config = {
    dev: {
        db: {
            host: 'localhost',
            port: 5432,
            database: 'craftbook',
            user: 'snoop',
            password: ''
        },
        port: 3030,
        winston: {
            level: 'info',
            maxsize: 0.5*1024*1024,
            maxFiles: 1,
            tailable: true,
            maxRetries: 1
        }
    }
};

module.exports = config[process.env.CRAFTBOOK_ENV] || config.dev;