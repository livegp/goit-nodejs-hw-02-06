import { Schema, model } from "mongoose";
import Joi from "joi";
import { runValidatorsAtUpdate } from "./hooks.js";
import handleMongooseError from "../helpers/handleMongooseError.js";

const nameRegexp = /^.{2,30}$/;
const nameRegexpErrMessage = "The minimum length is 2 characters, and the maximum is 30 characters";
const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;
const phoneRegexpErrMessage = "The correct number format should be: (xxx) xxx-xxxx";
const emailRegexp = /^\S+@\S+\.\S+$/;
const emailRegexpErrMessage = "Invalid email format";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      match: [nameRegexp, nameRegexpErrMessage],
    },
    email: {
      type: String,
      match: [emailRegexp, emailRegexpErrMessage],
    },
    phone: {
      type: String,
      match: [phoneRegexp, phoneRegexpErrMessage],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    }
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);
contactSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);
contactSchema.post("findOneAndUpdate", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).required().messages({
    "string.pattern.base": nameRegexpErrMessage,
    "any.required": "Missing required name field",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.email": emailRegexpErrMessage,
    "any.required": "Missing required email field",
  }),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "string.pattern.base": phoneRegexpErrMessage,
    "any.required": "Missing required phone field",
  }),
  favorite: Joi.boolean().messages({
    "any.required": "Missing required favorite field",
  }),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export const schemas = {
  addSchema,
  updateFavoriteSchema,
};

export const Contact = model("contact", contactSchema);
