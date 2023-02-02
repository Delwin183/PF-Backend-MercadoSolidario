const prisma = require("../../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateLogin } = require("./validationLogin");
const allUsersTypes = require("../AllUsersControllers/allUsersControllers");
const { SECRET_KEY_JWT } = process.env;

// module.exports = {
//     loginOfAUser: async function (body) {
//       let isValidate = await validateLogin(body);
//       let {email, password, type_of_user} = body;

//       if (isValidate.containErrors) {
//         throw new Error(JSON.stringify(isValidate))        
//       }

//       const user = await prisma[`${type_of_user}`].findFirst({where: {email}});
//       if (!user) {
//         throw new Error(JSON.stringify({containErrors: true, message: 'Por favor, registrese.'}))
//       }
//       let isEqual = await bcrypt.compare(password, user.password);

//       if (!isEqual) {
//         throw new Error(JSON.stringify({containErrors: true, message: 'Contraseña incorrecta. Por favor, ingrese nuevamente.'}))
//       }
      
//       const token = jwt.sign({
//         email: email,
//         type_of_user: type_of_user
//       }, SECRET_KEY_JWT, {expiresIn: '2w'});
//       console.log('controllerlogin4');

//     //   localStorage.setItem('token', token);
//       return {token, containErrors: false, message: 'Usted se validó correctamente, bienvenido.'}
//     }
// };


module.exports = {
  loginOfAUser: async function (body) {
    let isValidate = await validateLogin(body);
    let {email, password, loginGoogle} = body;

    if (isValidate.containErrors) {
      throw new Error(JSON.stringify(isValidate))        
    }

    const allUsers = await allUsersTypes();
    if (allUsers.containErrors) {
      return allUsers
    }
    
    const user = allUsers.data.filter(user => user.email === email);

    if (!user) {
      throw new Error(JSON.stringify({containErrors: true, message: 'Por favor, registrese.'}))
    }

    const token = jwt.sign({
      email: email,
      id: user[0].id,
      isActive: user[0].isActive,
      type_of_user: user[0].type_of_user
    }, SECRET_KEY_JWT, {expiresIn: '2w'});
    
    if (loginGoogle === true) {
      return {token, user, ...isValidate}
    }

    if (!password) {
      throw new Error(JSON.stringify({containErrors: true, message: 'Por favor, ingrese su contraseña.'}));
    }

    let isEqual = await bcrypt.compare(password, user[0].password);
    if (!isEqual){
      throw new Error(JSON.stringify({containErrors: true, message: 'Contraseña incorrecta. Por favor, ingrese nuevamente.'}))
    }
    
    return {token, user, ...isValidate}
  }
};
