const Joi = require("joi");

const roleSchema = {
  create() {
    return Joi.object({
      name: Joi.string().required(),
    });
  },

  update() {
    return Joi.object({
      name: Joi.string(),
    });
  },
};

module.exports = roleSchema;
