const Joi = require('joi');

const animalSchema = {
	create() {
		return Joi.object({
			name:Joi.string().trim(),
            description:Joi.string().trim(),
            resume:Joi.string().trim(),
            needs:Joi.string().trim(),
            birthdate:Joi.string().pattern(new RegExp('^0[1-9]([-. ]?[0-9]{2}){4}$')),
            address:Joi.string(),
            city:Joi.string(),
            postal_code:Joi.string().pattern(new RegExp('^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$')),
            country:Joi.string()
		});																					  
	},
    update() {
		return Joi.object({
			role_id:Joi.number(),
		});																					  
	}
}

module.exports = animalSchema;