const prisma = require('../../db');
const validateUser = require('./validationUsers');

module.exports = {
    signUp: async function(body) {        

        const validateUsers = await validateUser(body);

        if (validateUsers.containErrors) {
            throw new Error(validateUsers)
        }

        const user = await prisma.users.create({
            data: body,
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
