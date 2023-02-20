const auth = require('../controller/web/auth.web.controller')

module.exports = (router) => {
    router.get('/index', auth.login)
}