import Joi from "joi";
import { Schema, model } from "mongoose"
import handleMongooseError from "../helpers/handleMongooseError.js";

const namePattern = /^.{2,30}$/;
const namePatternErrMessage = "The minimum length is 2 characters, and the maximum is 30 characters";
const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
const phonePatternErrMessage  = "The correct number format should be: (xxx) xxx-xxxx";
const emailPattern = /^\S+@\S+\.\S+$/;
const emailPatternErrMessage = "Invalid email format";

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
    match: [namePattern, namePatternErrMessage],
  },
  email: {
    type: String,
    match: [emailPattern, emailPatternErrMessage],
  },
  phone: {
    type: String,
    match: [phonePattern, phonePatternErrMessage],
  }
  ,
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false })

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string()
    .pattern(namePattern)
    .required()
    .messages({
      "string.pattern.base": namePatternErrMessage,
      "any.required": "Missing required name field",
    }),
  email: Joi.string().email().required().messages({
    "string.email": emailPatternErrMessage,
    "any.required": "Missing required email field",
  }),
  phone: Joi.string()
    .pattern(phonePattern)
    .required()
    .messages({
      "string.pattern.base":
      phonePatternErrMessage,
      "any.required": "Missing required phone field",
    }),
  favorite: Joi.boolean().required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});


export const schemas = {
  addSchema,
  updateFavoriteSchema
};

export const Contact = model("contact", contactSchema);