const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/secret.config')

/**
 * Login uing basic authentication
 */
exports.basicAuthDecode = (req) => {
  // check for basic auth header
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return false;
  }

  const base64 =  req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64, 'base64').toString('ascii').split(':');

  return {
    user: credentials[0],
    password: credentials[1]
  }
}

/**
 * Hashing password using Bcrypt
 */
exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash;
}

/**
 * Comparing bcrypt hashed user entered password vs save password in db
 */
exports.comparePassword = async (password, savePassword) => {
  return await bcrypt.compare(password, savePassword);
}

/**
 * Access token JWT singning
 */
exports.signAccessToken = (user) => {
  return jwt.sign({user: user}, secret.jwtSercet, {expiresIn: '120sec'});
}

/**
 * Refresh token JWT singning
 */
exports.signRefreshToken = (user) => {
  return jwt.sign({user: user}, secret.jwtSercet, {expiresIn: '180sec'});
}

/**
 * Access/refresh JWT token verification
 */
exports.verifyToken = (token) => {
  let verified = false;

  if (token) {
    jwt.verify(token, secret.jwtSercet, (err, decode) => {
      verified =  err ? false : decode;
    })
  }

  return verified;
}