const db = require("../config/db");

const perekrutModel = {
  insert: ({
    nama,
    email,
    jabatan,
    nama_perusahaan,
    domisili,
    no_hp,
    password,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into perekrut (nama, email, jabatan, nama_perusahaan, domisili, no_hp, password ) values ('${nama}', '${email}', '${jabatan}', '${nama_perusahaan}', '${domisili}','${no_hp}','${password}')`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  selectPerekrutById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from perekrut where id=${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  loginPerekrut: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from perekrut where email='${email}' `,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  update: (
    id,
    {
      jabatan,
      nama_perusahaan,
      domisili,
      no_hp,
      ig,
      linkedin,
      deskripsi,
      email,
    }
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        `update perekrut set jabatan='${jabatan}', nama_perusahaan='${nama_perusahaan}', domisili='${domisili}',no_hp='${no_hp}',ig='${ig}',linkedin='${linkedin}',deskripsi='${deskripsi}',email='${email}' where id=${id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  updatePhoto: (id, image) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE perekrut SET image = '${image}' WHERE id = ${id}`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  insertHire: ({
    pekerja_id,
    perekrut_id,
    projek,
    email,
    nama_pengirim,
    deskripsi,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into hire (pekerja_id,perekrut_id,projek,email,nama_pengirim,deskripsi ) values ('${pekerja_id}', '${perekrut_id}', '${projek}', '${email}', '${nama_pengirim}','${deskripsi}')`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  selectHire: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select h.* from hire h left join pekerja s on h.pekerja_id = s.id left join perekrut p on h.perekrut_id = p.id where h.pekerja_id=${id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  cutHire: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`delete from hire where id =${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
};

module.exports = perekrutModel;
