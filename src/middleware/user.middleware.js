const auth = require('../helper/auth.helper')
const util = require('../helper/util.helper')
const userModel = require('../model/user.model')
const apiResp = require('../helper/api.resp')

exports.verifyAccessToken = (req, resp, next) => {
  const token = util.getToken(req)
  const verified = auth.verifyToken(token);

  if (verified) {
    userModel.getUserByEmail(verified.user).then(data => {
      if (data.rowCount > 0) {
        // Set user data
        req.user = data.rows[0];
        next();
      } else {
        return apiResp.unauthorized(resp);
      }
    })
    .catch(err => {
      return apiResp.internalErr(resp, err);
    })
  } else {
    return apiResp.unauthorized(resp);
  }
}

exports.isGuest = (request, response, next) => {
    
}