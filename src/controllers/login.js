const bcrypt = require("bcrypt");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { petname, password} = req.body;

  User.findOne({ petname }).then((user) => {
    if (!user) {
      return res.json({ mensaje: "Usuario no encontrado" });
    }

    bcrypt.compare(password, user.password).then((esCorrecta) => {
      if (esCorrecta) {
        const { id, petname } = user;

        const data = {
          id,
          petname,
        };

        const token = jwt.sign(data, "secreto", {
          expiresIn: 86400 /* 24hs */,
        });

        res.json({
          mensaje: "Usuario logeado correctamente",
          user: {
            id,
            petname,
            token,
          },
        });
      } else {
        return res.json({ mensaje: "Contraseña incorrecta" });
      }
    });
  });
};

module.exports = login;