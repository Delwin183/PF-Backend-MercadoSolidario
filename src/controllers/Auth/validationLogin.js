// async function validateLogin(body) {
//     const { email, password, type_of_user} = body
//     console.log('validatelogin');

//   if(!email) {
//     return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el email.'};
//   }

//   console.log('validatelogin1');

//   if(!password) {
//     return {containErrors: true, message: 'Este campo es requerido, por favor ingrese su contraseña.'};
//   }
//   console.log('validatelogin2');

//   if(!type_of_user) {
//     return {containErrors: true, message: 'Este campo es requerido, por favor ingresa el tipo de usuario Rodri.'};
//   }
//   console.log('validatelogin3');

//   return {containErrors: false};
// }

// module.exports = { validateLogin };


async function validateLogin(body) {
  const { email} = body

if(!email) {
  return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el email.'};
}

console.log('estoy en la validacion del login');

return {containErrors: false, message: 'Usted se validó correctamente, bienvenido.'};
};

async function validateAdmin(body){
  const {email, password} = body;

  if(email !== "contacto.mercadosolidario@gmail.com"){
    return {containErrors: true, message: 'El correo ingresado no corresponde a una cuenta administradora.'};
  }
  if(password !== "henryms123"){
    return {containErrors: true, message: 'El password ingresado es incorrecto.'};
  }
  return {containErrors: false, message: "Usted ingresó correctamente."};
}

module.exports = { validateLogin, validateAdmin };
