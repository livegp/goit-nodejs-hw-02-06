import { Router } from "express";
import contacts from "../../models/contacts.js";
import httpError from "../../helpers/httpError.js";
import Joi from "joi";

const router = Router();

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
})

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {{}
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw httpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }    
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw httpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  } 
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw httpError(404, "Contact not found");
    }
    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  } 
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw httpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw httpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  } 
});

export default router;
