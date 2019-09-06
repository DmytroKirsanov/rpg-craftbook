module.exports = class GamesController {

    constructor(Container) {
        this.gamesService = Container.get('GamesService');
    };

    async createGame({body}, res) {
        const gamesService = this.gamesService;
        try {
            res.json(await gamesService.createGame({name: body.name, version: body.version}));
        } catch (e) {
            console.log(e);
            res.send(e);
        }
    };
};