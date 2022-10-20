const market = require('./customer')

module.exports = (app) => {
    app.use('/customer', market);
};