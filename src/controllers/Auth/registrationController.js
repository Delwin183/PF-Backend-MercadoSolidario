const prisma = require("../../db");
const bcrypt = require('bcrypt');

module.exports = {
    registerOfAUser: async function (body) {
      let {email, password, id} = body;
      const user = await prisma.users.findUnique({where: {id}})
      
      if (user) {
        throw new Error({containErrors: true, message: 'Ya existe un usuario con este email'})
      }

      let usernow = await bcrypt.hash(password, 10)
      return {email, usernow, message: 'Registro correcto'}
    }
};
