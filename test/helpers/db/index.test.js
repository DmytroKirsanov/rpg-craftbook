const dbHelper = new (require('../../../src/helpers/db'))();

describe('Authentication Helpers Tests', () => {
    it('optionsEmpty(): Should return true for undefined of null or empty string', () => {
        expect(dbHelper.optionsEmpty()).toBeTruthy();
        expect(dbHelper.optionsEmpty(null)).toBeTruthy();
        expect(dbHelper.optionsEmpty('')).toBeTruthy();
    });

    it('optionsEmpty(): Should return false for primitives', () => {
        expect(dbHelper.optionsEmpty('test')).toBeFalsy();
        expect(dbHelper.optionsEmpty(true)).toBeFalsy();
        expect(dbHelper.optionsEmpty(123)).toBeFalsy();
    });

    it('optionsEmpty(): Should return true for empty array or array without first element', () => {
        expect(dbHelper.optionsEmpty([])).toBeTruthy();
        expect(dbHelper.optionsEmpty([null])).toBeTruthy();
        expect(dbHelper.optionsEmpty([undefined])).toBeTruthy();
    });

    it('optionsEmpty(): Should return false for array with values', () => {
        expect(dbHelper.optionsEmpty([1, 2])).toBeFalsy();
    });

    it('optionsEmpty(): Should return false object', () => {
        expect(dbHelper.optionsEmpty({test: 'test'})).toBeFalsy();
    });

    it('optionsEmpty(): Should return true for empty object', () => {
        expect(dbHelper.optionsEmpty({})).toBeTruthy();
    });

    it('selectorBuilder(): Should return proper string for normal key, array value', () => {
        expect(dbHelper.selectorBuilder('normal', [1], 'aliasTest.')).toBe('aliasTest.normal  IN (\'1\')');
    });

    it('selectorBuilder(): Should return proper string for negate key, array value', () => {
        expect(dbHelper.selectorBuilder('!normal', [1], 'aliasTest.')).toBe('aliasTest.normal NOT IN (\'1\')');
    });

    it('selectorBuilder(): Should return proper string for normal key, string or number value', () => {
        expect(dbHelper.selectorBuilder('normal', 'test', 'aliasTest.')).toBe('aliasTest.normal=\'test\'');
        expect(dbHelper.selectorBuilder('normal', 1, 'aliasTest.')).toBe('aliasTest.normal=\'1\'');
    });

    it('selectorBuilder(): Should return proper string for negate key, string or number value', () => {
        expect(dbHelper.selectorBuilder('!normal', 'test', 'aliasTest.')).toBe('aliasTest.normal!=\'test\'');
        expect(dbHelper.selectorBuilder('!normal', 1, 'aliasTest.')).toBe('aliasTest.normal!=\'1\'');
    });

    it('selectorBuilder(): Should return proper string for "like" key, string or number value', () => {
        expect(dbHelper.selectorBuilder('~normal', 'test', 'aliasTest.')).toBe('aliasTest.normal~\'test\'');
        expect(dbHelper.selectorBuilder('~normal', 1, 'aliasTest.')).toBe('aliasTest.normal~\'1\'');
    });

    it('selectorBuilder(): Should return empty string for any key, object value', () => {
        expect(dbHelper.selectorBuilder('normal', {}, 'aliasTest.')).toBe('');
    });

    it('whereBuilder(): Should return empty string for undefined options', () => {
        expect(dbHelper.whereBuilder(undefined)).toBe('');
        expect(dbHelper.whereBuilder(null)).toBe('');
    });

    it('whereBuilder(): Should return valid string for options without alias', () => {
        expect(dbHelper.whereBuilder({testKey: 'testValue'})).toBe(`testKey='testValue'`);
    });

    it('whereBuilder(): Should return valid string for options with alias', () => {
        expect(dbHelper.whereBuilder({testKey: 'testValue'}, 'alias')).toBe(`alias.testKey='testValue'`);
    });

    it('optionsLikeProperty(): With no keys provided should change all keys in object', () => {
        expect(dbHelper.optionsLikeProperty({testKey1: 'testValue1', testKey2: 'testValue2'}))
            .toEqual({'~testKey1': 'testValue1', '~testKey2': 'testValue2'});
    });

    it('optionsLikeProperty(): With array keys provided should change only those keys in object', () => {
        expect(dbHelper.optionsLikeProperty(
            {
                testKey1: 'testValue1',
                testKey2: 'testValue2',
                testKey3: 'testValue3'
            }, ['testKey2', 'testKey1', 'someOther']))
            .toEqual({'~testKey1': 'testValue1', '~testKey2': 'testValue2', testKey3: 'testValue3'});
    });

    it('optionsLikeProperty(): With one string key provided should change only this keys in object', () => {
        expect(dbHelper.optionsLikeProperty(
            {
                testKey1: 'testValue1',
                testKey2: 'testValue2',
                testKey3: 'testValue3'
            }, 'testKey2'))
            .toEqual({testKey1: 'testValue1', '~testKey2': 'testValue2', testKey3: 'testValue3'});
    });

    it('optionsLikeProperty(): With invalid key provided should not change the object', () => {
        expect(dbHelper.optionsLikeProperty(
            {
                testKey1: 'testValue1',
                testKey2: 'testValue2',
                testKey3: 'testValue3'
            }, 'someOther'))
            .toEqual({testKey1: 'testValue1', testKey2: 'testValue2', testKey3: 'testValue3'});
    });
});