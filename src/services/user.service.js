module.exports = class UserService {
    constructor(container) {
        this.logger = container.get('logger');
        this.userRepository = container.get('UserRepository');
        this.authHelper = container.get('authHelpers');
    }

    async createUser(email, password) {
        const salt = this.authHelper.generateSalt();
        password = this.authHelper.encryptPassword(password, salt);
        try {
            return await this.userRepository.createUser({email, password, salt});
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