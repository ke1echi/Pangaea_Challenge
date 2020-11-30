const Joi = require('@hapi/joi');

// Subcribe validaton
exports.subscribeDetail = Joi.object({
  url: Joi.string().required(),
});


