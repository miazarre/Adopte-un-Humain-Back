const Joi = require("joi");

const hasTagSchema = {
  addTag() {
    return Joi.object({
      tag_id: Joi.number().required(),
    });
  },
};

module.exports = hasTagSchema;
