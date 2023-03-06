import Joi from "joi";

const userSchema = {
  create() {
    return Joi.object({
      firstname: Joi.string().trim().required(),
      lastname: Joi.string().trim().required(),
      email: Joi.string().trim().email().required(),
      password: Joi.string().min(6).max(20).required(),
      phone: Joi.string()
        .pattern(new RegExp("^0[1-9]([-. ]?[0-9]{2}){4}$"))  // Regex le numéro doit commencer par 0 et avoir maximum 10 chiffres
        .required(), 										 // il peut contenir des points, espaces et tirets entre
    }); 													 // des series de 2 chiffres
  }, 

  login() {
    return Joi.object({
      email: Joi.string().trim().email().required(),
      password: Joi.string().min(6).max(20).required(),
    });
  },
};

export default userSchema;

