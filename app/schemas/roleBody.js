import Joi from 'joi';

const roleSchema = {
	create() {
		return Joi.object({
			name:Joi.string().required()
		});
	},

	update() {
		return Joi.object({
			name:Joi.string()
		});
	}
}

export default roleSchema;
