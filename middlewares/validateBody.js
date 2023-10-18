import httpError from "../helpers/httpError.js";

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      let errorMessage;
      if (error.details.some(detail => detail.context.key === 'favorite')) {
        errorMessage = "missing field favorite";
      } else if (error.details.some(detail => detail.context.key === 'email')) {
        errorMessage = "missing required field email";
      } else if ((!req.body || Object.keys(req.body).length === 0)) { 
        errorMessage = "missing fields"
      } else {
        errorMessage = error.details[0].message;
      }
      next(httpError(400, errorMessage));
    } else {
      next();
    }
  };
  return func;
};

export default validateBody;
