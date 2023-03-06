import Joi from "joi";

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

export default tagSchema;

