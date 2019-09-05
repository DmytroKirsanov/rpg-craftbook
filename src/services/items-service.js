module.exports = class ItemsService {
    constructor(Container) {
        this.itemsRepository = Container.get('ItemsRepository');
    };
};