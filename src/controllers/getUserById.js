const { log } = require("console");
const User = require("../models/users");

const getUserById = async (req, res) => {
  console.log("Cyntia tem razao")

  const { id } = req.user;

  if (id.length === 24) {
    User.findById(id).then((user) => {
      if (!user) {
        return res.json({
          mensaje: "No se encontro ningun usuario con esa ID",
        });
      } else {
        const { _id, password, __v, ...resto } = user._doc;
        res.json(resto);
      }
    });
  } else {
    res.json({ mensaje: "Estas enviando una contraseña incorrecta" });
  }
};

module.exports = getUserById;