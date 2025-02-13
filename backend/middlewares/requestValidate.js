const { celebrate, Joi } = require('celebrate');

module.exports = (next) => {

  const validateURL = (value, helpers) => {
    if (validator.isURL(value)) {
      return value;
    }
    return helpers.error('string.uri');
  };

   return celebrate({
     body: Joi.object().keys({
       email: Joi.string().required().custom(validateURL),
       password: Joi.string().required().custom(validateURL),
     }),
   });

};