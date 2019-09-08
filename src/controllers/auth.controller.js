const passport = require('passport');

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

    login(req, res, next) {
        return passport.authenticate('local', { session: false }, (err, {id, email}, info) => {
            if (err) {
                return next(err);
            }
            if (id) {
                return res.json({id, email, token: this.authHelpers.generateJWT({id, email})});
            }
            return next(new Error('Invalid password or email.'));
        })(req, res, next);
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