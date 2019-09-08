module.exports = class GamesRepository {
    constructor(Container) {
        this.logger = Container.get('logger');
        this.pgp = Container.get('pgp');
        this.db = Container.get('db');
    };

    async createGame({name, version}) {
        const query = this.pgp.helpers.insert({name, version}, null, 'game') + ' returning game_id as id';
        this.logger.debug(`[SQL]: ${query}`);
        return this.db.one(query);
    }
};