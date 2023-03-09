import Joi from 'joi';

const adoptSchema = {
    create() {
        return Joi.object({
        form1: Joi.string(),
        form2: Joi.string(),
        form3: Joi.string(),
        comment: Joi.string(),
        status: Joi.string(),
        user_id: Joi.number(),
        animal_id: Joi.number()
        });
    },
    update() {
        return Joi.object({
        comment: Joi.string(),
        date_adopt: Joi.date(),
        status: Joi.string()
        });
    },
};
export default adoptSchema;
