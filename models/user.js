import Joi from "joi";
import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/handleMongooseError.js";

const emailRegexp = /^\S+@\S+\.\S+$/;
const emailRegexpErrMessage = "Invalid email format";
const passwordRegexp =
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).{8,}$/;
const passwordRegexpErrMessage = `
The password must meet the following criteria:
- Minimum 8 characters in length.
- Must contain at least one digit (0-9).
- Must contain at least one uppercase letter (A-Z).
- Must contain at least one lowercase letter (a-z).
- Must contain at least one special character (e.g., !, @, #, $, %, ^, &, *, ?) or space.
Please enter a valid password to proceed.
`;

const validSubscriptionOptions = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      match: [passwordRegexp, passwordRegexpErrMessage],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [emailRegexp, emailRegexpErrMessage],
    },
    subscription: {
      type: String,
      enum: validSubscriptionOptions,
      default: validSubscriptionOptions[0],
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  password: Joi.string().pattern(passwordRegexp).required().messages({
    "string.pattern.base": passwordRegexpErrMessage,
    "any.required": "Missing required password field",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.email": emailRegexpErrMessage,
    "any.required": "Missing required email field",
  }),
  subscription: Joi.string()
  .valid(...validSubscriptionOptions)
    .default(validSubscriptionOptions[0])
    .messages({ "any.only": "Invalid subscription" }),
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

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...validSubscriptionOptions)
    .default(validSubscriptionOptions[0])
    .required()
    .messages({
      "any.only": `Subscription must be one of ${validSubscriptionOptions.join(", ")}.`,
    }),
});


export const schemas = {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
};

export const User = model("user", userSchema);
