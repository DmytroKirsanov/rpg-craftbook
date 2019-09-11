const index = require('../../../src/helpers/auth');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../../../src/config');

jest.mock('crypto');
jest.mock('jsonwebtoken');
jest.mock('../../../src/config');


describe('Authentication Helpers Tests', () => {
    it('encryptPassword(): Should call crypto method with valid parameters', () => {
        crypto.pbkdf2Sync.mockReturnValue('encrypted');
        index.encryptPassword(12345, 'test');
        expect(crypto.pbkdf2Sync).lastCalledWith('12345', 'test', 10000, 512, 'sha512');
    });

    it('validatePassword(): With valid password should return true', () => {
        crypto.pbkdf2Sync.mockReturnValue('valid');
        const result = index.validatePassword('valid', {password: 'valid', salt: 'test'});
        expect(result).toBeTruthy();
    });

    it('validatePassword(): With valid password should return true', () => {
        crypto.pbkdf2Sync.mockReturnValue('invalid');
        const result = index.validatePassword('invalid', {password: 'valid', salt: 'test'});
        expect(result).toBeFalsy();
    });

    it('generateSalt(): Should return string', () => {
        crypto.randomBytes.mockReturnValue('test');
        expect(index.generateSalt()).toBe('test')
    });

    it('generateJWT(): Should call jwt sign with valid parameters and expiration date', () => {
        const now = new Date();
        config.jwtSecret = 'secret';
        jwt.sign.mockImplementation(({id, email, aLevel, locale, exp}, secret) => {
            expect(id).toBe(111);
            expect(email).toBe('email');
            expect(aLevel).toBe(0);
            expect(locale).toBe('en');
            expect(secret).toBe('secret');
            const daysExp = (exp - now.getMilliseconds()) / (1000*60*60*24);
            expect(17 < daysExp).toBeTruthy();
            expect(daysExp < 19).toBeTruthy();
        });
        index.generateJWT({account_id: 111, email: 'email', admin_level: 0, locale: 'en'});
        expect(jwt.sign).toBeCalledTimes(1);
    });

    it('decodeJWT(): Should call jwt verify with valid token parameter', () => {
        config.jwtSecret = 'secret';
        jwt.sign.mockImplementation((token) => {
            expect(token).toBe('token');
        });
        index.decodeJWT('token');
        expect(jwt.verify).toBeCalledTimes(1);
    });

    it('getTokenFromHeaders(): Without Authorization header should return null', () => {
        expect(index.getTokenFromHeaders({headers: {}})).toBeNull();
    });

    it('getTokenFromHeaders(): With Authorization header without "Token" prefix should return null', () => {
        expect(index.getTokenFromHeaders({headers: {authorization: 'blabla'}})).toBeNull();
    });

    it('getTokenFromHeaders(): With Authorization header with "Token" prefix should return value', () => {
        expect(index.getTokenFromHeaders({headers: {authorization: 'Token blabla'}})).toBe('blabla');
    });
});