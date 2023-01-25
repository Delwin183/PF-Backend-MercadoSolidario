const prisma = require("../../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY_JWT } = process.env;

module.exports = {
    loginOfAUser: async function (body) {
      let {email, password, id} = body;
      const user = await prisma.users.findUnique({where: {id}})
      
      if (!user) {
        throw new Error({containErrors: true, message: 'Por favor, registrese.'})
      }

      let isEqual = await bcrypt.compare(password, user.password);
      
      if (!isEqual) {
        throw new Error({containErrors: true, message: 'Contraseña incorrecta. Por favor, ingrese nuevamente.'})
      }

      const token = jwt.sign({
        email: email,
        id: id
      }, SECRET_KEY_JWT, {expiresIn: '24h'})
      
      return {token, containErrors: false, message: 'Usted se validó correctamente, bienvenido.'}
    }
};

