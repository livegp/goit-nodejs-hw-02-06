import { Router } from "express";
import contacts from "../../controllers/contacts.js";

const router = Router();

router.get("/", contacts.listContacts);

router.get("/:id", contacts.getContactById);

router.post("/", contacts.addContact);

router.delete("/:id", contacts.removeContact);

router.put("/:id", contacts.updateContact);

export default router;
