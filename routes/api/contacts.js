import { Router } from "express";
import contacts from "../../controllers/contacts.js";
import validateBody from "../../middlewares/validateBody.js";
import addSchema from "../../schemas/contacts.js";

const router = Router();

router.get("/", contacts.listContacts);

router.get("/:id", contacts.getContactById);

router.post("/", validateBody(addSchema, "missing required name field"), contacts.addContact);

router.delete("/:id", contacts.removeContact);

router.put("/:id", validateBody(addSchema, "missing fields"), contacts.updateContact);

export default router;
