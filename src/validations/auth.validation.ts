import Joi from "joi";

const signup = {
  body: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).alphanum().required(),
  }),
};

const signin = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).alphanum().required(),
  }),
};

export default { signup, signin };
