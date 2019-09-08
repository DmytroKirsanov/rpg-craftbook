module.exports = class GamesController {

    constructor(Container) {
        this.gamesService = Container.get('GamesService');
        this.logger = Container.get('logger');
        this.logger.debug('GamesController loaded');
    };

    async createGame({body}, res, next) {
        const gamesService = this.gamesService;
        try {
            res.json(await gamesService.createGame({name: body.name, version: body.version}));
        } catch (e) {
            this.logger.debug('GamesController loaded');
            next(e);
        }
    };
};