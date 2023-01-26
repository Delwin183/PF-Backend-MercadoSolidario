async function validateRegister(email, password, type_of_user){
    console.log('validate register');
    if(!email) {
        return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el email.'};
    }

    if(!password) {
        return {containErrors: true, message: 'Este campo es requerido, por favor ingrese la contraseña.'};
    }

    if(!type_of_user) {
        return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el tipo de usuario.'};
    }

    return {containErrors: false, message: 'Usted se registró correctamente, muchas gracias.'};
}

module.exports = validateRegister;
