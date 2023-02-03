async function validateUser(body){
    const {name, lastName, user_linkedin, profession, email, password} = body;
    console.log('validate users');

    if(!name) {
        return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el nombre.'};
    }

    if(!lastName) {
        return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el apellido.'};
    }

    // if(!cuil) {
    //     return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el CUIL.'};
    // }

    // if(!user_linkedin) {
    //     return {containErrors: true, message: 'Este campo es requerido, por favor ingrese su usuario de LinkedIn.'};
    // }

    // if(!profession) {
    //     return {containErrors: true, message: 'Este campo es requerido, por favor ingrese su profesión.'};
    // }

    // if(!email) {
    //     return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el email.'};
    // }

    // if(!password) {
    //     return {containErrors: true, message: 'Este campo es requerido, por favor ingrese su contraseña.'};
    // }

    return {containErrors: false, message: 'Usted se registró correctamente, muchas gracias.'};

};

async function validateUpdateUser (body) {
    const {name, lastName, cuil, email, type_of_user  } = body;
  
    if (cuil) {
      return {containErrors: true, message: 'EL CUIL es único por persona y no se puede editar'};
    }
    if (email) {
      return {containErrors: true, message: 'El email no se puede cambiar, crear nuevo usuario'};
    }
    if(type_of_user !== "company" || type_of_user !== "ong" || type_of_user !== "user"){
    return {containErrors: true, message: 'El tipo de usuario solo puede ser company, ong, user'};
    }
  
    return {containErrors: false, message: "Usted ha actualizado el registro correctamente"}
  
  }

module.exports = {validateUser, validateUpdateUser};
