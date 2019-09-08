module.exports = class UserRepository {
    constructor(container) {
        this.logger = container.get('logger');
        this.pgp = container.get('pgp');
        this.db = container.get('db');
    }

    async createUser({email, password, salt}) {
        const query = this.pgp.helpers.insert({email, password, salt}, null, 'user') + ' returning user_id as id';
        this.logger.debug(`[SQL]: ${query}`);
        return this.db.one(query);
    }

    async findByEmail(email) {
        const query = 'select * from public."user" as u where u.email = $1';
        this.logger.debug(`[SQL]: ${query}`);
        return this.db.one(query, email);
    }
};