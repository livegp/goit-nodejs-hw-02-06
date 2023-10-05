import Joi from "joi";
import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError.js";

const nameRegexp = /^.{2,30}$/;
const nameRegexpErrMessage = "The minimum length is 2 characters, and the maximum is 30 characters";
const emailRegexp = /^\S+@\S+\.\S+$/;
const emailRegexpErrMessage = "Invalid email format";
const passwordRegexp = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).{8,}$/;
const passwordRegexpErrMessage = `
The password must meet the following criteria:
- Minimum 8 characters in length.
- Must contain at least one digit (0-9).
- Must contain at least one uppercase letter (A-Z).
- Must contain at least one lowercase letter (a-z).
- Must contain at least one special character (e.g., !, @, #, $, %, ^, &, *, ?) or space.
Please enter a valid password to proceed.
`;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    match: [nameRegexp, nameRegexpErrMessage],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [emailRegexp, emailRegexpErrMessage],
  },
  password: {
    type: String,
    required: true,
    match: [passwordRegexp, passwordRegexpErrMessage],
  },
  token: {
    type: String,
    default: null,
  },
}, { versionKey: false, timestamps: true  });

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).required().messages({
    "string.pattern.base": nameRegexpErrMessage,
    "any.required": "Missing required name field",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.email": emailRegexpErrMessage,
    "any.required": "Missing required email field",
  }),
  password: Joi.string().pattern(passwordRegexp).required().messages({
    "string.pattern.base": passwordRegexpErrMessage,
    "any.required": "Missing required password field",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.email": emailRegexpErrMessage,
    "any.required": "Missing required email field",
  }),
  password: Joi.string().pattern(passwordRegexp).required().messages({
    "string.pattern.base": passwordRegexpErrMessage,
    "any.required": "Missing required password field",
  }),
});

export const schemas = {
  registerSchema,
  loginSchema,
};

export const User = model("user", userSchema);