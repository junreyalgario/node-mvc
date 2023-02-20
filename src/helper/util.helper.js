exports.getToken = (req) => {
  // check for basic auth header
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.split(' ')[1];
  }

  return token;
}