async function validateLogin(body) {
    const { email, password, type_of_user} = body
    console.log('validatelogin');

  if(!email) {
    return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el email.'};
  }

  console.log('validatelogin1');

  if(!password) {
    return {containErrors: true, message: 'Este campo es requerido, por favor ingrese su contraseña.'};
  }
  console.log('validatelogin2');

  if(!type_of_user) {
    return {containErrors: true, message: 'Este campo es requerido, por favor ingresa el tipo de usuario Rodri.'};
  }
  console.log('validatelogin3');

  return {containErrors: false};
}

module.exports = { validateLogin };
