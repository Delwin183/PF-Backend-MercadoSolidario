const prisma = require('../../db');
const validateUser = require('./validationUsers');

module.exports = {
    signUp: async function(body) {        

        const validateUsers = validateUser(body);

        if (validateUsers) {
            throw new Error(validateUsers)
        }

        const user = await prisma.users.create({
            data: body
        })
        return {...user, ...validateUsers}
    },
    getUsers: async function() {
        const allUsers = await prisma.users.findMany({include: {
            posts: true
        }});
        return allUsers;
    }
}
