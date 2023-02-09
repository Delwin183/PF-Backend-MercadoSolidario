async function validateLogin(body) {
  const { email} = body

if(!email) {
  return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el email.'};
}

console.log('estoy en la validacion del login');

return {containErrors: false, message: 'Usted se validó correctamente, bienvenido.'};
};

module.exports = { validateLogin };
