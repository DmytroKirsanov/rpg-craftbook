module.exports = class ItemsRepository {
    constructor(Container) {
        this.db = Container.get('db');
    };
};