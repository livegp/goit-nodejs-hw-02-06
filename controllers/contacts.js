import httpError from "../helpers/httpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import Contact from "../models/contact.js";

const listContacts = async (req, res) => {
        const result = await Contact.find();
        res.json(result);
};

// const getContactById = async (req, res) => {
//     const { id } = req.params;
//     const result = await contacts.getContactById(id);
//     if (!result) {
//       throw httpError(404, "Not found");
//     }
//     res.json(result);
// };

// const addContact = async (req, res) => {
//     const result = await contacts.addContact(req.body);
//     res.status(201).json(result); 
// }

// const removeContact = async (req, res) => {
//     const { id } = req.params;
//     const result = await contacts.removeContact(id);
//     if (!result) {
//       throw httpError(404, "Not found");
//     }
//     res.json({
//       message: "contact deleted",
//     }); 
// }

// const updateContact = async (req, res) => {
//     const { id } = req.params;
//     const result = await contacts.updateContact(id, req.body);
//     if (!result) {
//       throw httpError(404, "Not found");
//     }
//     res.json(result);
// }

export default {
  listContacts: ctrlWrapper(listContacts),
  // getContactById: ctrlWrapper(getContactById),
  // removeContact: ctrlWrapper(removeContact),
  // addContact: ctrlWrapper(addContact),
  // updateContact: ctrlWrapper(updateContact),
};
