const multer = require("multer");
const path = require("path");

const maxSize = 1024 * 1024;

const multerUpload = multer({
  storage: multer.diskStorage({
    // destination: (req, file, cb) => {
    //   cb(null, "./public");
    // },
    filename: (req, file, cb) => {
      console.log(file.name);
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}${ext}`;
      cb(null, filename);
    },
    limits: maxSize,
  }),

  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext == ".png" || ext == ".jpg") {
      cb(null, true);
    } else {
      const error = {
        messasge: "file must be JPG or PNG",
      };
      cb(error, false);
    }
  },
});

const upload = (req, res, next) => {
  const multerSingle = multerUpload.single("image");
  multerSingle(req, res, (err) => {
    if (err) {
      console.log(err);
      res.json({ messasge: "error when upload file", err });
    } else {
      next();
    }
  });
};

module.exports = upload;
