const express = require("express");

const upload = require("../middleware/upload");
const router = express.Router();
const {
  register,
  login,
  editPerekrut,
  listPerekrutById,
  uploadPhoto,
  hire,
  listHireByPekerjaId,
  removeHireByPekerjaId,
} = require("../controller/perekrutController");

router.post("/insertPerekrut", register);
router.post("/hire", hire);
router.delete("/removeHireByPekerjaId/:id", removeHireByPekerjaId);
router.get("/listPerekrutById/:id", listPerekrutById);
router.get("/listHireByPekerjaId/:id", listHireByPekerjaId);
router.put("/editImagePerekrut/:id", upload, uploadPhoto);
router.post("/loginPerekrut", login);
router.put("/editPerekrut/:id", editPerekrut);

module.exports = router;
