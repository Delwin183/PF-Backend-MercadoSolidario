const prisma = require("../../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateLogin } = require("./validationLogin");
const { SECRET_KEY_JWT } = process.env;

module.exports = {
    loginOfAUser: async function (body) {
      let isValidate = await validateLogin(body);
      let {email, password, type_of_user} = body;

      if (isValidate.containErrors) {
        throw new Error(isValidate)        
      }
  console.log('controllerlogin1');

      const user = await prisma[`${type_of_user}`].findFirst({where: {email}});
      if (!user) {
        throw new Error({containErrors: true, message: 'Por favor, registrese.'})
      }
      console.log('controllerlogin2');

      let isEqual = await bcrypt.compare(password, user.password);

      if (!isEqual) {
        throw new Error({containErrors: true, message: 'Contraseña incorrecta. Por favor, ingrese nuevamente.'})
      }
      console.log('controllerlogin3');

      const token = jwt.sign({
        email: email,
        type_of_user: type_of_user
      }, SECRET_KEY_JWT, {expiresIn: '2w'});
      console.log('controllerlogin4');

    //   localStorage.setItem('token', token);
      return {token, containErrors: false, message: 'Usted se validó correctamente, bienvenido.'}
    }
};
