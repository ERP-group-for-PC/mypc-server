const customer = require('./customer')

module.exports = (app) => {
    app.use('/api/customer', customer);
};