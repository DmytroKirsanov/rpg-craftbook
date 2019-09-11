module.exports = class DbHelper {
    constructor() {
    };

    optionsEmpty(options) {
        if (options === undefined || options === null || options === '') return true;
        if (typeof options !== 'object') return false;
        if (Array.isArray(options)) return (options.length === 0 || options[0] === undefined || options[0] === null);
        const hop = Object.prototype.hasOwnProperty;
        for (let key in options) { if (hop.call(options, key)) return false; }
        return true;
    }

    whereBuilder(opts, alias) {
        if (this.optionsEmpty(opts)) return '';
        alias = alias ? alias + '.' : '';
        return Object.keys(opts).map(key => this.selectorBuilder(key, opts[key], alias)).join(' AND ');
    }

    selectorBuilder(key, value, alias) {
        if (Array.isArray(value)) {
            return `${alias + key.replace('!', '')} ${key.indexOf('!') === 0 ? 'NOT': ''} IN ('${value.join("','")}')`;
        } else if (typeof value === 'string' || typeof value === 'number') {
            if (key[0] === '!') {
                return `${alias + key.slice(1)}!=\'${value}\'`;
            } else if (key[0] === '~') {
                return `${alias + key.slice(1)}~\'${value}\'`;
            } else {
                return `${alias + key}=\'${value}\'`;
            }
        }
        return '';
    }

    optionsLikeProperty(options, keys) {
        const result = {};
        if (!keys) {
            Object.keys(options).forEach(key => result[`~${key}`] = options[key]);
            return result;
        } else if (Array.isArray(keys)) {
            keys.forEach(key => {
                if (options[key]) {
                    result[`~${key}`] = options[key];
                    delete options[key];
                }
            });
            return {...options, ...result};
        } else {
            result[`~${keys}`] = options[keys];
            delete options[keys];
            return {...options, ...result};
        }
    }
};