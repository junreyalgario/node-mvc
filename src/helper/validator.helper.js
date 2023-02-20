const { validationMessage } = require('../config/validation.message')
const validator = require('validator')

var validated = {
  result: true,
  errorMessage: []
}

module.exports = {

  isEmail: (email) => {
    if (validator.isEmail(email)) {
    return validated;
    } else {
      validated.result =  false;
      validated.errorMessage.push(validationMessage.isEmail)
      return validated;
    }
  }

}