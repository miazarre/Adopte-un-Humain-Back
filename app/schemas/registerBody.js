const Joi = require('joi');

module.exports = Joi.object({
    firstname:Joi.string().trim(),
	lastname:Joi.string().trim(),
	email:Joi.string().trim().email(),
	password:Joi.string().min(6).max(20),
	phone:Joi.string().pattern(new RegExp('^0[1-9]([-. ]?[0-9]{2}){4}$'))
}).required();