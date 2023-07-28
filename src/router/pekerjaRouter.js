const express = require("express");

const upload = require("../middleware/upload");
const router = express.Router();
const {
  register,
  login,
  editPekerja,
  listPekerja,
  uploadPhoto,
  addSkill,
  listSkill,
  addPengalaman,
  listPengalaman,
  addPortofolio,
  listPortofolio,
  listPekerjaById,
  removeSkill,
  removePengalaman,
  removePortofolio,
} = require("../controller/pekerjaController");

router.get("/listPekerja", listPekerja);
router.get("/listPekerjaById/:id", listPekerjaById);
router.post("/insertPekerja", register);
router.post("/loginPekerja", login);
router.put("/editPekerja/:id", editPekerja);
router.put("/editImage/:id", upload, uploadPhoto);
router.post("/addSkill", addSkill);
router.get("/listSkill/:id", listSkill);
router.delete("/removeSkill/:id", removeSkill);
router.post("/addPengalaman", upload, addPengalaman);
router.delete("/removePengalaman/:id", removePengalaman);
router.get("/listPengalaman/:id", listPengalaman);
router.post("/addPortofolio", upload, addPortofolio);
router.delete("/removePortofolio/:id", removePortofolio);
router.get("/listPortofolio/:id", listPortofolio);

module.exports = router;
