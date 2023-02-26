const Joi = require('joi');

const userSchema = {
	create() {
		return Joi.object({
			firstname:Joi.string().trim().required(),
			lastname:Joi.string().trim().required(),
			email:Joi.string().trim().email().required(),
			password:Joi.string().min(6).max(20).required(),
			phone:Joi.string().pattern(new RegExp('^0[1-9]([-. ]?[0-9]{2}){4}$')).required()
		});
	},

	update() {
		return Joi.object({
			name:Joi.string(),
			priority:Joi.boolean()
		});
	}
}

module.exports = userSchema;