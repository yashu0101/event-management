const Joi = require("joi");
function validate(req, res, next) {
  const user = req.body;

  const schema = Joi.object({
    "name.first": Joi.string().min(3).max(45),
    "name.last": Joi.string().min(3).max(45),

    mobile: Joi.string()
      .pattern(new RegExp("^[0-9]{10,15}$"))
      .error(() => new Error("mobile mut be 10 digits")),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "in"] },
      })
      .error(() => new Error("Invalid email")),

    password: Joi.string()
      .allow("")
      .optional()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    gender: Joi.string().min(1).max(25),
    role: Joi.string().min(1).max(25),
    status: Joi.number().min(0).max(10), // string or use number
    userId: Joi.string().min(0).max(10).optional(), // string or use number
    dob: Joi.date(),
    avatar: Joi.string().allow("").optional(),
    idDoc: Joi.string().allow("").optional(),

    "address.street": Joi.string().min(3).max(45),
    "address.city": Joi.string().min(3).max(45),
    "address.country": Joi.string().min(3).max(45),
    "address.pincode": Joi.string().min(2).max(15),
    existingAvatar: Joi.string().allow("").optional(),
    existingIdDoc: Joi.string().allow("").optional(),
  });

  const result = schema.validate(user);
  console.log("Result", result);
  if (result?.error)
    res.status(500).send({ message: result.error.message, error: null });
  else next();
}

module.exports = { validate };
