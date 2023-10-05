import jwt from 'jsonwebtoken';
import httpError from "../helpers/httpError.js";
import { User } from '../models/user.js';

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(httpError(401, "Invalid token"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      throw httpError(401, "Invalid token");
    }
    req.user = user;
    next();
  } catch (error) {
    next(httpError(401, "Invalid token"));
  }
};

export default authenticate;
