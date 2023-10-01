import { Router } from "express";
import ctrl from "../../controllers/contacts.js";
import validateBody from "../../middlewares/validateBody.js";
import {schemas} from "../../models/contact.js";
import isValidId from "../../middlewares/isValidId.js";

const router = Router();

router.get("/", ctrl.listContacts);

router.get("/:id", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:id",isValidId, ctrl.removeContact);

router.put("/:id",isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch("/:id/favorite",isValidId, validateBody(schemas.updateStatusSchema), ctrl.updateStatusContact);

export default router;