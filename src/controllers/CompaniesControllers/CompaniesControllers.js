const prisma = require('../../db');
const { isCompany } = require('./validationCompanies');

module.exports = {
    signUp: async function(body) {
        try {
            const {name, lastName, country, phone, companyName, amountEmployee, companyCUIT} = body;
            const resultIsCompany = await isCompany(companyCUIT);
            
            //check         
            if(resultIsCompany) {
                if(!name | !lastName | !country | !amountEmployee | !companyName | !phone) {
                    console.log('Please, provide all fields')
                }
                
                const company = await prisma.companies.create({
                    data:{
                        name,
                        lastName,
                        country,
                        phone,
                        amountEmployee,
                        companyName,
                        companyCUIT
                    }
                })
                return company
            }
           
        } catch (error) {
            console.log(error)
        }
    },
    getCompanies: async function() {
        const allCompanies = await prisma.companies.findMany();
        return allCompanies;
    }
}

