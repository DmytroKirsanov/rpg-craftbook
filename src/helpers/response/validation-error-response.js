module.exports = (err) => {
    const errors = [];
    err.errors.forEach(({types, field}) => errors.push({types, field}));
    return {errors, success: false, errorType: 'validation'}
};