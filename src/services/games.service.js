module.exports = class GamesService {
    constructor(Container) {
        this.gamesRepository = Container.get('GamesRepository');
    };

    async createGame({name, version}) {
        return this.gamesRepository.createGame({name, version});
    }

    async getGamesByNameAndVersionDto(dto) {
        return this.gamesRepository.getGamesByNameAndVersionDto(dto);
    }
};