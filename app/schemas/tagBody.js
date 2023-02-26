const Joi = require("joi");

const tagSchema = {
	create() {
		return Joi.object({
			name:Joi.string().required(),
            priority:Joi.boolean()
		});
	},

	update() {
		return Joi.object({
			name:Joi.string(),
            priority:Joi.boolean()
		});
	}
}

module.exports = tagSchema;
