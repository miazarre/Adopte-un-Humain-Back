const Joi = require('joi');

module.exports = Joi.object({
    firstname:Joi.string().trim().required(),
	lastname:Joi.string().trim().required(),
	email:Joi.string().trim().email().required(),
	password:Joi.string().min(6).max(20).required(),
	phone:Joi.string().pattern(new RegExp('^0[1-9]([-. ]?[0-9]{2}){4}$')).required()
});