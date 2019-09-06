module.exports = class GamesRepository {
    constructor(Container) {
        this.pgp = Container.get('pgp');
        this.db = Container.get('db');
    };

    async createGame({name, version}) {
        const query = this.pgp.helpers.insert({name, version}, null, 'game') + ' returning game_id';
        return this.db.one(query);
    }
};