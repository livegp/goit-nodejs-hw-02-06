import httpError from "../helpers/httpError.js";

const validateBody = (schema, errorType) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      let errorMessage;
      switch (errorType) {
        case "post":
          if (error.details[0].type === "any.required") {
            errorMessage = `missing required ${error.details[0].context.key} field`;
          } else {
            errorMessage = error.details[0].message;
          }
          break;
        case "put":
          if (error.details[0].context.key) {
            errorMessage = "missing fields";
          } else {
            errorMessage = error.details[0].message;
          }
          break;
      }
      next(httpError(400, errorMessage));
    } else {
      next();
    }
  };
  return func;
};

export default validateBody;
