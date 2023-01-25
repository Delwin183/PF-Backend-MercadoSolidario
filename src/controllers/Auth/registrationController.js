const prisma = require("../../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY_JWT } = process.env;

module.exports = {
    registerOfAUser: async function (body) {
      let {email, password, id} = body;
      const user = await prisma[`${type_of_user}`].findUnique({where: {id}})
      
      if (user) {
        throw new Error({containErrors: true, message: 'Ya existe un usuario con este email'})
      }

      let usernow = await bcrypt.hash(password, 10)
      return {email, usernow, message: 'Registro correcto'}
    }
};
