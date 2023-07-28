const perekrutModel = require("../model/perekrut");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../helper/cloudinary");

const perekrutController = {
  register: async (req, res) => {
    try {
      const {
        nama,
        email,
        jabatan,
        nama_perusahaan,
        domisili,
        no_hp,
        password,
      } = req.body;
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          res.json({ message: "failed hash password" });
        }
        const data = {
          nama,
          email,
          jabatan,
          nama_perusahaan,
          domisili,
          no_hp,
          password: hash,
        };
        perekrutModel
          .insert(data)
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } catch (error) {
      console.log(error);
    }
  },

  listPerekrutById: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await perekrutModel.selectPerekrutById(id);
      res.json(result.rows);
    } catch (error) {
      res.json(error);
      console.log(error);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const perekrut = await perekrutModel.loginPerekrut(email);
      console.log(perekrut);
      const match = await bcrypt.compare(password, perekrut.rows[0].password);
      console.log(match);

      if (!match) return res.status(400).json({ msg: "password salah!" });

      const id = perekrut.rows[0].id;
      const nama = perekrut.rows[0].nama;
      //   const email = pekerja.rows[0].email;
      const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      res.status(200).json({ nama, email, accessToken });
    } catch (error) {
      res.status(400).json({ msg: "email tidak ditemukan!", errors: error });
      console.log(error);
    }
  },

  editPerekrut: async (req, res) => {
    const {
      jabatan,
      nama_perusahaan,
      domisili,
      no_hp,
      ig,
      linkedin,
      deskripsi,
      email,
    } = req.body;
    const id = req.params.id;
    const data = {
      jabatan,
      nama_perusahaan,
      domisili,
      no_hp,
      ig,
      linkedin,
      deskripsi,
      email,
    };
    console.log(data);
    try {
      const result = await perekrutModel.update(id, data);
      res.status(200).json({ msg: "data berhasil diperbarui", result });
    } catch (error) {
      res.status(500).json({ msg: "server error", error });
      console.log(error);
    }
  },

  uploadPhoto: async (req, res) => {
    try {
      const id = req.params.id;

      const img = await cloudinary.uploader.upload(req.file.path);
      console.log(img);
      console.log(img.url);
      await perekrutModel.updatePhoto(id, img.url);

      res.status(200).json({ msg: "upload photo berhasil", img });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "server error", error });
    }
  },

  hire: async (req, res) => {
    try {
      const {
        pekerja_id,
        perekrut_id,
        projek,
        email,
        nama_pengirim,
        deskripsi,
      } = req.body;

      const data = {
        pekerja_id,
        perekrut_id,
        projek,
        email,
        nama_pengirim,
        deskripsi,
      };
      perekrutModel
        .insertHire(data)
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  },
  listHireByPekerjaId: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await perekrutModel.selectHire(id);
      res.json(result.rows);
    } catch (error) {
      res.json(error);
      console.log(error);
    }
  },
  removeHireByPekerjaId: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await perekrutModel.cutHire(id);
      res.json(result);
    } catch (error) {
      res.json(error);
      console.log(error);
    }
  },
};

module.exports = perekrutController;
