/*
    eslint
        import/no-commonjs: 0
*/

if (process.env.BROWSER) {
    const { browserHistory } = require('react-router');

    module.exports = browserHistory;
}
