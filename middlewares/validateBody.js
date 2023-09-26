import httpError from "../helpers/httpError.js";

const validateBody = (schema, errorMessage) => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(httpError(400, errorMessage));
        } else {
            next();
        }
    }
    return func;
}

export default validateBody;
