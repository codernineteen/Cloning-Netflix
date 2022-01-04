import { body, validationResult } from "express-validator";

//'body' only checking req.body
export const userValidtionRules = () => {
  return [body("email").isEmail(), body("password").isLength({ min: 5 })];
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
