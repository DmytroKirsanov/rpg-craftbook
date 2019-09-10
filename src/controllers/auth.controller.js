module.exports = class AuthController {
    constructor(container) {
        this.userService = container.get('UserService');
        this.authHelpers = container.get('authHelpers');
        this.responseHelpers = container.get('responseHelpers');
    }

    async register(req, res, next) {
        const {body: {email, password}} = req;
        try {
            const {id} = await this.userService.createUser(email, password);
            const result = {id, email, token: this.authHelpers.generateJWT({id, email})};
            res.json(this.responseHelpers.successResponse(result));
        } catch (e) {
            next(e);
        }
    }

    login(req, res) {
        const {id, email} = req.user;
        const result = {id, email, token: this.authHelpers.generateJWT({id, email})};
        res.json(this.responseHelpers.successResponse(result));
    }

    async getAuthed(req, res, next) {
        const email = req.params.email;
        try {
            const user = await this.userService.findByEmail(email);
            res.json(user);
        } catch (e) {
            next(e);
        }
    }
};