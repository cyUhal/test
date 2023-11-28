const bcrypt = require("bcrypt");
const User = require("../models/users");

const register = async (req, res) => {
  const { petname, email, password, username } = req.body;

  User.findOne({ email }).then((usuario) => {
    if (usuario) {
      return res.json({ mensaje: "Ya existe un usuario con ese correo" });
    } else if (!petname || !username|| !password || !email) {
      return res.json({ mensaje: "Falta el nombre / correo / contraseña" });
    } else {
      bcrypt.hash(password, 10, (error, contraseñaHasheada) => {
        if (error) res.json({ error });
        else {
          const nuevoUsuario = new User({
            petname,
            email,
            password: contraseñaHasheada,
            username
          });

          nuevoUsuario
            .save()
            .then((usuario) => {
              res.json({ mensaje: "Usuario creado correctamente", usuario });
            })
            .catch((error) => console.error(error));
        }
      });
    }
  });
};

module.exports = register;