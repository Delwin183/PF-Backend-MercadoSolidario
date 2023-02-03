const prisma = require("../../db");
const bcrypt = require('bcrypt');
const validateRegister = require("./registrationValidate");
const jwt = require('jsonwebtoken');
const { SECRET_KEY_JWT } = process.env;

// module.exports = {
//     registerOfAUser: async function (body) {
//       let {email, password, type_of_user} = body;
//       let isValidate = await validateRegister(body)

//       if (isValidate.containErrors) {
//         return isValidate
//       }

//       const user = await prisma[`${type_of_user}`].findFirst({where: {email}})
      
//       if (user) {
//         return {containErrors: true, message: 'Ya existe un usuario con este email, por favor, ingrese otra cuenta.'}
//       }
//       let hashPassword = await bcrypt.hash(password, 10);
      
//       if (!hashPassword) {
//         return {containErrors: true, message: 'Error al hashear la contraseña, por favor, intenta en unos minutos nuevamente.'}
//       }

//       return {password: hashPassword, containErrors: false, message: 'Usted se registró correctamente, muchas gracias.'};
//     }
// };

const allUsersTypes = require("../AllUsersControllers/allUsersControllers");
module.exports = {
  registerOfAUser: async function (body) {
    let isValidate = await validateRegister(body)
    let {email, password, type_of_user} = body;

    if (isValidate.containErrors) {
      return isValidate
    }

    const allUsers = await allUsersTypes();
    if (allUsers.containErrors) {
      return allUsers
    }
    const user = allUsers.data.filter(user => user.email === email);
    console.log(user);

    if (user.length > 0) {
      return {containErrors: true, message: 'Ya existe un usuario con este email, por favor, ingrese otra cuenta.'}
    }

    if (!password) {
      return {password: undefined, containErrors: false, message: 'Usted se registró correctamente, muchas gracias.'};
    }

    let hashPassword = await bcrypt.hash(password, 10);
    
    if (!hashPassword) {
      return {containErrors: true, message: 'Al parecer, hubo un error guardando la contraseña. Por favor, intenta en unos minutos nuevamente.'}
    }

    return {password: hashPassword, containErrors: false, message: 'Usted se registró correctamente, muchas gracias.'};
  }
};
