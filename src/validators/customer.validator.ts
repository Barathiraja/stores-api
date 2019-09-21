import * as Joi from "joi";

const customerValidator = Joi.object().keys({

    Id: Joi.number().integer().required(),
    StoreId: Joi.number().integer().required(),
    Firstname: Joi.string().required(),
    Lastname: Joi.string().required(),
    Phone: Joi.string(),
    Email: Joi.string().email({ minDomainAtoms: 2 }).required(),
})

export default customerValidator;

