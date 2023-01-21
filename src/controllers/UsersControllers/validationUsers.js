function validateUser(body){
    const {name, lastName, cuil, user_linkedin, profession, email, password} = body;

    if(!name) {
        return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el nombre.'};
    }

    if(!lastName) {
        return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el apellido.'};
    }

    if(!cuil) {
        return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el CUIL.'};
    }

    if(!user_linkedin) {
        return {containErrors: true, message: 'Este campo es requerido, por favor ingrese su usuario de LinkedIn.'};
    }

    if(!profession) {
        return {containErrors: true, message: 'Este campo es requerido, por favor ingrese su profesión.'};
    }

    if(!email) {
        return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el email.'};
    }

    if(!password) {
        return {containErrors: true, message: 'Este campo es requerido, por favor ingrese su contraseña.'};
    }

    return {containErrors: false, message: 'Usted se registró correctamente, muchas gracias.'};

}

module.exports = validateUser;
