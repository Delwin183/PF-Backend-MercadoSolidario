const prisma = require('../../db');
const { registerOfAUser } = require('../Auth/registrationController');
const validateUser = require('./validationUsers');

module.exports = {
    signUp: async function(body) {        
    console.log('controller register 1');

      const validateUsers = await validateUser(body);
      console.log('controller register2');
      const hashPassword = await registerOfAUser(body);
      console.log('controller register3');
      let {email, name, lastName,  cuil, user_linkedin, birthDate, profession, type_of_user} = body;

        if (validateUsers.containErrors || hashPassword.containErrors) {
            throw new Error(validateUsers || hashPassword.containErrors)
        }
    console.log('controller register 4');

        const user = await prisma.users.create({
            data: {
              password: hashPassword.password,
              email,
              name,
              lastName,
              cuil: cuil ? cuil : undefined,
              user_linkedin: user_linkedin ? user_linkedin : undefined,
              birthDate: birthDate ? birthDate : undefined,
              profession: profession ? profession : undefined,
              type_of_user
            },
            include:{confirmed: true}
        })
        return {...user, ...validateUsers}
    },
    getUsers: async function() {
        const allUsers = await prisma.users.findMany({
            where: {
                isActive: true,
            },
            include: {
                confirmed: true
        }});
        return allUsers;
    },
    getUserById: async function(id){
        if (!id) {
            throw new Error("Para buscar un usuario por ID, por favor, ingrese el identificador de la misma.") 
        }

        const result = await prisma.users.findUnique({
            where: {id},
            include: {
                confirmed: true,
            }
        })
        if (!id) {
            throw new Error("El usuario que busca no existe.")
        }

        return result;
    },
    logicDeleteUser: async function(id) {
        if(!id) {
          throw new Error("El ID del usuario ingresado no es correcto")
        }
    
        const result = await prisma.users.update({
          where: {
            id: id,
          },
          data: {
            isActive: false,
          },
        });
        return result
      },
      getDeleteUser: async function () {
        const result = await prisma.users.findMany({
          where: {
            isActive: false,
          },
          include: {
            confirmed: true,
          }
        });
        return result;
      },
}
