const auth = require('../../helper/auth.helper')
const userModel = require('../../model/user.model')
const validator = require('../../helper/validator.helper')
const apiResp = require('../../helper/api.resp')

exports.userLogin = async (req, resp) => {
  const credential = auth.basicAuthDecode(req)

  const valid = validator.isEmail(credential.user);
  if (!valid.result) {
    return resp.status(401).send({
      success: false,
      message: valid.errorMessage
    })
  } 

  if (credential) {
    userModel.getUserByEmail(credential.user)
    .then(async data => {
      if (data.rowCount > 0) {
        const isMatch = await auth.comparePassword(credential.password, data.rows[0].password);
        if (isMatch) {
          return resp.status(200).send({
            success: true,
            access_token: auth.signAccessToken(credential.user),
            refresh_token: auth.signRefreshToken(credential.user)
          })
        }
      }

      return resp.status(401).send({
        success: false,
        message: 'Wrong user or password'
      })
    })
    .catch(err => {
      console.log(err)
      return apiResp.internalErr(resp, err)
    })

  } else {
    return resp.status(401).send({
      success: false,
      message: 'Invalid Authentication Credentials'
    })
  }
}