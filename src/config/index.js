const config = {
    dev: {
        db: {
            host: 'localhost',
            port: 5432,
            database: 'craftbook',
            user: 'snoop',
            password: ''
        },
        port: 3030
    }
};

module.exports = config[process.env.CRAFTBOOK_ENV] || config.dev;