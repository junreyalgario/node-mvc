const apiAuth = require('../controller/api/api.auth.controller')
const userController = require('../controller/api/api.user.controller')
const userMiddleware = require('../middleware/user.middleware')

module.exports = (app) => {

  app.prefix('/api', (router) => {

    // router.get('/', userMidle.verifyToken, user.index)

  })

  app.prefix('/api/user', (router) => {

    router.post('/login', 
      apiAuth.userLogin)

    router.put('/create', 
      userController.create)

    router.get('/view',
      userMiddleware.verifyAccessToken,
      userController.view)

  })

}