const db = require("../config/db");

const pekerjaModel = {
  insert: ({ nama, email, no_hp, password }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into pekerja (nama,email,no_hp,password) values ('${nama}', '${email}','${no_hp}','${password}')`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  selectAllPekerja: () => {
    return new Promise((resolve, reject) => {
      db.query(`select * from pekerja`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  selectPekerjaById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from pekerja where id=${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  selectAllPekerjaSkill: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `select p.*,s.nama_skill from pekerja p join skill s on p.id = s.pekerja_id   '`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  loginPekerja: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from pekerja where email='${email}' `,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  update: (id, { nama, job, domisili, no_hp, ig, linkedin, email }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `update pekerja set nama='${nama}', job='${job}', domisili='${domisili}', no_hp='${no_hp}',ig='${ig}',linkedin='${linkedin}',email='${email}' where id=${id}`,
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
        `UPDATE pekerja SET image = '${image}' WHERE id = ${id}`,
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },

  insertSkill: ({ pekerja_id, nama_skill }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into skill (pekerja_id, nama_skill) values ('${pekerja_id}','${nama_skill}')`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  selectSkillByPekerjaId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select s.* from skill s left join pekerja p on s.pekerja_id = p.id where s.pekerja_id='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  cutSkill: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`delete from skill where id=${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  insertPengalaman: (
    { pekerja_id, posisi, perusahaan, lama, tgl_mulai, tgl_keluar },
    image
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into pengalaman (pekerja_id, posisi,perusahaan,lama,tgl_mulai,tgl_keluar,image) values ('${pekerja_id}','${posisi}','${perusahaan}','${lama}','${tgl_mulai}','${tgl_keluar}','${image}' )`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  selectPengalamanByPekerjaId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select e.* from pengalaman e left join pekerja p on e.pekerja_id = p.id where e.pekerja_id='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  selectPengalamanByPekerjaId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select e.* from pengalaman e left join pekerja p on e.pekerja_id = p.id where e.pekerja_id='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  cutPengalaman: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`delete from pengalaman where id=${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  insertPortofolio: ({ pekerja_id, nama_apk, link }, image) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into portofolio (pekerja_id, nama_apk,link,image) values ('${pekerja_id}','${nama_apk}','${link}','${image}' )`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  selectPortofolioByPekerjaId: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select e.* from portofolio e left join pekerja p on e.pekerja_id = p.id where e.pekerja_id='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },

  cutPortofolio: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`delete from portofolio where id=${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
};

module.exports = pekerjaModel;
