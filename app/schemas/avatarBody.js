const Joi = require("joi");

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

module.exports = avatarSchema;
