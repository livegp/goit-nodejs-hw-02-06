import httpError from "../helpers/httpError.js";

const validateBody = (schema, errorType) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      let errorMessage;
      switch (errorType) {
        case "post":
          errorMessage = `missing required ${error.details[0].context.key} field`;
          break;
        case "put":
          errorMessage = "missing fields";
          break;
        default:
          errorMessage = `${error.details[0].message}`;
      }
      next(httpError(400, errorMessage));
    } else {
      next();
    }
  };
  return func;
};

export default validateBody;
