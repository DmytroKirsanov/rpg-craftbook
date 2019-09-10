module.exports = class GamesRepository {
    constructor(container) {
        this.logger = container.get('logger');
        this.pgp = container.get('pgp');
        this.db = container.get('db');
        this.dbHelper = container.get('dbHelper');
    };

    async createGame({name, version}) {
        const query = this.pgp.helpers.insert({name, version}, null, 'game') + ' returning *';
        this.logger.debug(`[SQL]: ${query}`);
        return this.db.one(query);
    }

    async getGamesByNameAndVersionDto(dto) {
        const options = this.dbHelper.optionsLikeProperty(dto);
        const query = this.pgp.as.format('select * from game g where ' + this.dbHelper.whereBuilder(options, 'g'));
        this.logger.debug(`[SQL]: ${query}`);
        return this.db.any(query);
    }
};