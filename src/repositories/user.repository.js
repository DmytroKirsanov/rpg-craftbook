module.exports = class UserRepository {
    constructor(container) {
        this.logger = container.get('logger');
        this.pgp = container.get('pgp');
        this.db = container.get('db');
    }

    async createUser(dto) {
        const query = this.pgp.helpers.insert(dto, null, 'account') + ' returning *';
        this.logger.debug(`[SQL]: ${query}`);
        return this.db.one(query);
    }

    async findByEmail(email) {
        const query = this.pgp.as.format('select * from account where email = $1', email);
        this.logger.debug(`[SQL]: ${query}`);
        return this.db.oneOrNone(query, email);
    }
};