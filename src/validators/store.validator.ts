import * as Joi from "joi";

const storeValidator = Joi.object().keys({
    Id: Joi.number().integer().required(),
    Name: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    Domain: Joi.string(),
    Phone: Joi.string(),
    Status: Joi.string(),
    Street: Joi.string(),
    State: Joi.string(),
})

export default storeValidator;

