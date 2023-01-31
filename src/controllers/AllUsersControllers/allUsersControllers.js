const prisma = require("../../db");

async function allUsersTypes() {
    const allCompanies = await prisma.company.findMany();
    const allOngs = await prisma.ong.findMany();
    const allVolunteers = await prisma.user.findMany();

    if (!allCompanies) return {message: 'Hubo un error al obtener las companías de la BD.', containErrors: true}

    if (!allOngs) return {message: "Hubo un error al obtener las ONG's de la BD.", containErrors: true}

    if (!allVolunteers) return {message: 'Hubo un error al obtener los voluntarios de la BD.', containErrors: true}

    const allUsers = [...allCompanies, ...allOngs, ...allVolunteers]

    return {data: allUsers, usersCounts: allUsers.length, containErrors: false}
}
module.exports = allUsersTypes;
