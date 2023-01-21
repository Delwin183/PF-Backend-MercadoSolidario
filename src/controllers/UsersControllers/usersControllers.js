const prisma = require('../../db');

module.exports = {
    signUp: async function(body) {
        try {
            const {name, lastName, cuil, user_linkedin, birthDate, profession, email, password} = body;
  
                if(!name | !lastName | cuil | user_linkedin | !profession | !email | !password) {
                    console.log('Please, provide all fields')
                }
    
                const user = await prisma.users.create({
                    data:{
                        name,
                        lastName,
                        cuil,
                        user_linkedin,
                        birthDate,
                        profession,
                        email,
                        password
                    }
                })
                return user
           
        } catch (error) {
            console.log(error)
        }
    },
    getUsers: async function() {
        const allUsers = await prisma.users.findMany({include: {
            posts: true
        }});
        return allUsers;
    }
}