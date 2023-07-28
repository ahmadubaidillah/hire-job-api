const pekerjaModel = require("../model/pekerja");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../helper/cloudinary");

const pekerjaController = {
  listPekerja: async (req, res) => {
    try {
      const result = await pekerjaModel.selectAllPekerja();
      res.json(result.rows);
    } catch (error) {
      res.json(error);
      console.log(error);
    }
  },
  listPekerjaById: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await pekerjaModel.selectPekerjaById(id);
      res.json(result.rows);
    } catch (error) {
      res.json(error);
      console.log(error);
    }
  },

  register: async (req, res) => {
    try {
      const { nama, email, no_hp, password } = req.body;
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          res.json({ message: "failed hash password" });
        }
        const data = { nama, email, no_hp, password: hash };
        pekerjaModel
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

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const pekerja = await pekerjaModel.loginPekerja(email);
      console.log(pekerja);
      const match = await bcrypt.compare(password, pekerja.rows[0].password);
      console.log(match);

      if (!match) return res.status(400).json({ msg: "password salah!" });

      const id = pekerja.rows[0].id;
      const nama = pekerja.rows[0].nama;
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

  editPekerja: async (req, res) => {
    const { nama, job, domisili, no_hp, ig, linkedin, email } = req.body;
    const id = req.params.id;
    const data = { nama, job, domisili, no_hp, ig, linkedin, email };
    console.log(data);
    try {
      const result = await pekerjaModel.update(id, data);
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
      await pekerjaModel.updatePhoto(id, img.url);

      res.status(200).json({ msg: "upload photo berhasil", img });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "server error", error });
    }
  },

  addSkill: async (req, res) => {
    const { pekerja_id, nama_skill } = req.body;
    const data = { pekerja_id, nama_skill };
    try {
      const result = await pekerjaModel.insertSkill(data);
      res.status(200).json({ msg: "insert skill berhasil", result, data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "server error", error });
    }
  },

  listSkill: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await pekerjaModel.selectSkillByPekerjaId(id);
      res.status(200).json({ msg: "get data skill berhasil", result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "server error", error });
    }
  },

  removeSkill: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await pekerjaModel.cutSkill(id);
      res.status(200).json({ msg: "delete skill berhasil", result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "server error", error });
    }
  },

  addPengalaman: async (req, res) => {
    const { pekerja_id, posisi, perusahaan, lama, tgl_mulai, tgl_keluar } =
      req.body;
    const image = await cloudinary.uploader.upload(req.file.path);
    console.log(image);
    console.log(image.url);
    const img = image.url;
    const data = {
      pekerja_id,
      posisi,
      perusahaan,
      lama,
      tgl_mulai,
      tgl_keluar,
    };

    try {
      const result = await pekerjaModel.insertPengalaman(data, img);
      res.status(200).json({ msg: "insert pengalaman berhasil", result, data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "server error", error });
    }
  },

  listPengalaman: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await pekerjaModel.selectPengalamanByPekerjaId(id);
      res.status(200).json({ msg: "get data pengalaman berhasil", result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "server error", error });
    }
  },

  removePengalaman: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await pekerjaModel.cutPengalaman(id);
      res.status(200).json({ msg: "delete pengalaman berhasil", result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "server error", error });
    }
  },

  addPortofolio: async (req, res) => {
    const { pekerja_id, nama_apk, link } = req.body;
    const image = await cloudinary.uploader.upload(req.file.path);
    console.log(image);
    console.log(image.url);
    const img = image.url;
    const data = { pekerja_id, nama_apk, link };

    try {
      const result = await pekerjaModel.insertPortofolio(data, img);
      res.status(200).json({ msg: "insert portofolio berhasil", result, data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "server error", error });
    }
  },

  listPortofolio: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await pekerjaModel.selectPortofolioByPekerjaId(id);
      res.status(200).json({ msg: "get data portofolio berhasil", result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "server error", error });
    }
  },

  removePortofolio: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await pekerjaModel.cutPortofolio(id);
      res.status(200).json({ msg: "delete pengalaman berhasil", result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "server error", error });
    }
  },
};

module.exports = pekerjaController;
