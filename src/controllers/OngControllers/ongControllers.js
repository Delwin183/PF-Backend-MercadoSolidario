//bring in prisma

const prisma = require('../../db');

const { isOng } = require('./validationOng');

// ONG singup
module.exports = {
    signUp: async function(body) {
        try {
            const {name, lastName, country, phone, province, ongName, amountEmployee, ongCUIT} = body;
            const resultIsOng = await isOng(ongCUIT);

            //check         
            if(resultIsOng) {
                if(!name | !lastName | country | province | ongName) {
                    console.log('Please, provide all fields')
                }
    
                const ong = await prisma.ong.create({
                    data:{
                        name,
                        lastName,
                        phone,
                        country,
                        province,
                        amountEmployee,
                        ongName,
                        ongCUIT
                    }
                })
                return ong
            }
           
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
