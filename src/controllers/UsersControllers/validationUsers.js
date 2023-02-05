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
    const {type_of_insignia, cuil, email} = body;

    if (cuil) {
      return {containErrors: true, message: 'EL CUIL es único por persona y no se puede editar'};
    }

    if (email) {
      return {containErrors: true, message: 'El email no se puede cambiar, crear nuevo usuario'};
    }

    if(type_of_insignia !== "participacion" && type_of_insignia !== "servicio" && type_of_insignia !== "especie" && type_of_insignia !== "dinero"){
      return {containErrors: true, message: 'El tipo de insignia solo puede ser participacion, servicio, especie o dinero'};
    }
  
    return {containErrors: false, message: "Usted ha actualizado el registro correctamente"}
  
  }

module.exports = {validateUser, validateUpdateUser};
