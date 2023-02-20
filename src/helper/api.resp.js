exports.internalErr = (resp, err) => {
  console.log(err)
  return resp.status(500).send({
    success: false,
    message: 'Internal Server Error'
  })
}

exports.unauthorized = (resp) => {
  console.log(`Failed to verify access token`)
  return resp.status(401).send({
    success: false,
    message: 'Unauthorized'
  })
}