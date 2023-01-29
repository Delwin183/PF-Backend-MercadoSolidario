const prisma = require("../../db");

module.exports = {
    allUsersTypes: async function () {
      
        const allCompanies = await prisma.company.findMany();
        const allOngs = await prisma.ong.findMany();
        const allVolunteers = await prisma.user.findMany();

        const allUsers = [...allCompanies, ...allOngs, ...allVolunteers]

        return allUsers
    }
};
