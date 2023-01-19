//bring in prisma

const prisma = require('../../db');

// ONG singup
module.exports = {
    signUp: async function(body) {
        try {
            const {name, lastName} = body;
            //check
            if(!name | !lastName) {
                console.log('Please, provide all fields')
            }

            const ong = await prisma.ong.create({
                data:{
                    name,
                    lastName
                }
            })

            return ong
        } catch (error) {
            console.log(error)
        }
    },
    getOngs: async function() {
        const users = await prisma.ong.findMany({include: {
            posts: true
        }});
        return users;
    }
}
