import Joi from "joi";

const avatarSchema = {
  create() {
    return Joi.object({
      name: Joi.string(),
      picture: Joi.binary()
    });
  },

  update() {
    return Joi.object({
      name: Joi.string(),
      priority: Joi.binary(),
    });
  },
};

export default avatarSchema;

