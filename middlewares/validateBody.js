import httpError from "../helpers/httpError.js";

const validateBody = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
          next (httpError(400, "missing required name field")) ;
        }
        next();
    }
    return func;
}

export default validateBody;