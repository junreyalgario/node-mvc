const auth = require('../../helper/auth.helper')
const userModel = require('../../model/user.model')
const apiResp = require('../../helper/api.resp')

exports.create = async (req, resp) => {
  let [f_name, l_name, email] = [req.body.f_name, req.body.l_name, req.body.email];
  const password = await auth.hashPassword(req.body.password);

  userModel.create([f_name, l_name, email, password])
  .then(data => {
    return resp.status(200).send({
      success: true,
      data: data.rows
    })
  })
  .catch(err => {
    return apiResp.internalErr(resp, err)
  })
}

exports.view = (req, resp) => {
  return resp.status(200).send({
    success: true,
    data: req.user
  })
}