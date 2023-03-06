import Joi from 'joi';

const userSchema = {
	update() {
		return Joi.object({
			firstname:Joi.string().trim(),
            lastname:Joi.string().trim(),
            email:Joi.string().trim().email(),
            password:Joi.string().min(6).max(20),
            phone:Joi.string().pattern(new RegExp('^0[1-9]([-. ]?[0-9]{2}){4}$')),
            address:Joi.string(),
            city:Joi.string(),
            postal_code:Joi.string().pattern(new RegExp('^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$')),
            country:Joi.string()
		});																					  
	},
    updateAdmin() {
		return Joi.object({
			role_id:Joi.number(),
		});																					  
	}
}

export default userSchema;



