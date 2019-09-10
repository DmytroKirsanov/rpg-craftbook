module.exports = class AuthController {
    constructor(container) {
        this.userService = container.get('UserService');
        this.authHelpers = container.get('authHelpers');
        this.responseHelpers = container.get('responseHelpers');
    }

    async register(req, res, next) {
        const {body: {email, password, locale}} = req;
        try {
            const account = await this.userService.createUser({email, password, locale});
            const result = {token: this.authHelpers.generateJWT(account)};
            res.json(this.responseHelpers.successResponse(result));
        } catch (e) {
            next(e);
        }
    }

    login({user}, res) {
        const result = {token: this.authHelpers.generateJWT(user)};
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