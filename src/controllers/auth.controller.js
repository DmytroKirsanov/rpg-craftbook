module.exports = class AuthController {
    constructor(container) {
        this.userService = container.get('UserService');
        this.authHelpers = container.get('authHelpers');
    }

    async register(req, res, next) {
        const {body: {email, password}} = req;
        try {
            const {id} = await this.userService.createUser(email, password);
            res.json({id, email, token: this.authHelpers.generateJWT({id, email})})
        } catch (e) {
            next(e);
        }
    }

    login(req, res) {
        const {id, email} = req.user;
        res.json({id, email, token: this.authHelpers.generateJWT({id, email})});
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