const prisma = require("../../db");

module.exports = {
    allUsersTypes: async function () {
      
        const allCompanies = await prisma.companies.findMany();
        const allOngs = await prisma.ong.findMany();
        const allVolunteers = await prisma.users.findMany();

        const allUsers = [...allCompanies, ...allOngs, ...allVolunteers]

        return allUsers
    }
};
