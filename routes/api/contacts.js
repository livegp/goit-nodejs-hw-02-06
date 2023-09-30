import { Router } from "express";
import ctrl from "../../controllers/contacts.js";
import validateBody from "../../middlewares/validateBody.js";
import addSchema from "../../schemas/contacts.js";

const router = Router();

router.get("/", ctrl.listContacts);

// router.get("/:id", ctrl.getContactById);

// router.post("/", validateBody(addSchema), ctrl.addContact);

// router.delete("/:id", ctrl.removeContact);

// router.put("/:id", validateBody(addSchema), ctrl.updateContact);

export default router;