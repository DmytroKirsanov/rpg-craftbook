module.exports = class UserService {
    constructor(container) {
        this.logger = container.get('logger');
        this.userRepository = container.get('UserRepository');
        this.authHelper = container.get('authHelpers');
    }

    async createUser(dto) {
        const salt = this.authHelper.generateSalt();
        dto = {...dto,
            password: this.authHelper.encryptPassword(dto.password, salt),
            salt,
            locale: dto.locale || 'en_US'};
        try {
            return await this.userRepository.createUser(dto);
        } catch (e) {
            this.logger.error(`[UserService.createUser] ${e.message}`);
            throw e;
        }
    }

    async findByEmail(email) {
        try {
            return await this.userRepository.findByEmail(email)
        } catch (e) {
            this.logger.error(`[UserService.findByEmail] ${e.message}`);
            throw e;
        }
    }
};