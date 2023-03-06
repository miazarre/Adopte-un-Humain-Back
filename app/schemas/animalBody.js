import Joi from 'joi';

const animalSchema = {
  create() {
    return Joi.object({
      name: Joi.string(),
      description: Joi.string(),
      resume: Joi.string(),
      needs: Joi.string(),
      birthdate: Joi.date(),
      status: Joi.string(),
      photo1: Joi.binary(),
      photo2: Joi.binary(),
      photo3: Joi.binary(),
      photo4: Joi.binary(),
    });
  },
  update() {
    return Joi.object({
      name: Joi.string(),
      description: Joi.string(),
      resume: Joi.string(),
      needs: Joi.string(),
      birthdate: Joi.date(),
      status: Joi.string(),
      photo1: Joi.binary(),
      photo2: Joi.binary(),
      photo3: Joi.binary(),
      photo4: Joi.binary(),
    });
  },
};
export default animalSchema;
