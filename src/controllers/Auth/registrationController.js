const prisma = require("../../db");
const bcrypt = require('bcrypt');
const validateRegister = require("./registrationValidate");
const jwt = require('jsonwebtoken');
const { SECRET_KEY_JWT } = process.env;

module.exports = {
    registerOfAUser: async function (body) {
      let {email, password, type_of_user} = body;
      let isValidate = await validateRegister(body)

      if (isValidate.containErrors) {
        return isValidate
      }

      const user = await prisma[`${type_of_user}`].findFirst({where: {email}})
      
      if (user) {
        return {containErrors: true, message: 'Ya existe un usuario con este email'}
      }
      let hashPassword = await bcrypt.hash(password, 10);
      
      if (!hashPassword) {
        return {containErrors: true, message: 'Error al hashear la contraseña, por favor, intenta en unos minutos nuevamente.'}
      }

      return {password: hashPassword, containErrors: false, message: 'Usted se registró correctamente, muchas gracias.'};
    }
};
