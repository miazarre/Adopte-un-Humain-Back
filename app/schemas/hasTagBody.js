import Joi from "joi";

const hasTagSchema = {
  addTag() {
    return Joi.object({
      tag_id: Joi.number().required(),
    });
  },
};

export default hasTagSchema;
