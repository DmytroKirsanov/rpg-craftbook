module.exports = class GamesController {

    constructor(container) {
        this.gamesService = container.get('GamesService');
        this.logger = container.get('logger');
        this.responseHelpers = container.get('responseHelpers');
    };

    async createGame({body}, res, next) {
        const gamesService = this.gamesService;
        try {
            const result = await gamesService.createGame({name: body.name, version: body.version});
            res.json(this.responseHelpers.successResponse(result));
        } catch (e) {
            next(e);
        }
    };

    async getGames(req, res, nex) {
        const {name, version} = req.query;

        res.json({name})
    }
};