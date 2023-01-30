async function validateRegister({email, password, type_of_user, cuit, rut, phone, name, lastName}){
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

    // switch (type_of_user) {
    //     case 'users':   
    //         if (!phone) {
    //             return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el numero de contacto de la empresa sin animos de lucro.'};
    //         }
    //     return {containErrors: false, message: 'Usted se registró correctamente, muchas gracias.'};
        
    //     case 'ong':   
    //         if (!cuit) {
    //             return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el CUIT.'};
    //         }

    //         if (!rut) {
    //             return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el archivo del Registro Unico Tributario..'};
    //         }

    //         if (!name) {
    //             return {containErrors: true, message: 'Este campo es requerido, por favor ingrese su nombre'};
    //         }

    //         if (!lastName) {
    //             return {containErrors: true, message: 'Este campo es requerido, por favor ingrese su apellido.'};
    //         }

    //         if (!phone) {
    //             return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el numero de contacto de la empresa sin animos de lucro.'};
    //         }

    //     return {containErrors: false, message: 'Usted se registró correctamente, muchas gracias.'};

    //     case 'companies':   
    //         if (!cuit) {
    //             return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el CUIT.'};
    //         }

    //         if (!rut) {
    //             return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el archivo del Registro Unico Tributario..'};
    //         }

    //         if (!name) {
    //             return {containErrors: true, message: 'Este campo es requerido, por favor ingrese su nombre'};
    //         }

    //         if (!lastName) {
    //             return {containErrors: true, message: 'Este campo es requerido, por favor ingrese su apellido.'};
    //         }

    //     return {containErrors: false, message: 'Usted se registró correctamente, muchas gracias.'};

    //     case 'admin':   
    //         if (email !== '') {
    //             return {containErrors: true, message: 'Solo un usuario tiene acceso a esta sección'};
    //         }

    //     return {containErrors: false, message: 'Usted se registró correctamente, muchas gracias.'};

    //     default:
    //         return {containErrors: true, message: 'Solo hay 4 tipos de usuario, elija uno de ellos.'};
    // }

    return {containErrors: false, message: 'Usted se registró correctamente, muchas gracias.'};
}

module.exports = validateRegister;

// async function validateRegister({email, type_of_user}){
    
//     if(!email) {
//         return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el email.'};
//     }
    
//     if(!type_of_user) {
//         return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el tipo de usuario.'};
//     }
   
//     return {containErrors: false, message: 'Usted se registró correctamente, muchas gracias.'};
// }

// module.exports = validateRegister;
