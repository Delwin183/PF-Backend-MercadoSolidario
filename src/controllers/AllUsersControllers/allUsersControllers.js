const prisma = require("../../db");

async function allUsersTypes() {
    const allCompanies = await prisma.company.findMany();
    const allOngs = await prisma.ong.findMany();
    const allVolunteers = await prisma.user.findMany();

    const allUsers = [...allCompanies, ...allOngs, ...allVolunteers]

    return {data: allUsers, usersCounts: allUsers.length, containErrors: false}
}
module.exports = allUsersTypes;
