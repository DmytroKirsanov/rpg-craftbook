module.exports = class GamesService {
    constructor(Container) {
        this.itemsRepository = Container.get('GamesRepository');
    };

    async createGame({name, version}) {
        return this.itemsRepository.createGame({name, version});
    }
};