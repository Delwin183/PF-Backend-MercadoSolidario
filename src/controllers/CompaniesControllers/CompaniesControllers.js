const prisma = require("../../db");
const { isCompany } = require("./validationCompanies");

module.exports = {
  signUp: async function (body) {
    const resultIsCompany = await isCompany(body);

    //check
    if (resultIsCompany.containErrors) {
      throw new Error(resultIsCompany)
    }
    
    const company = await prisma.companies.create({
      data: body,
    });
    return {...company, ...resultIsCompany};
  },
  getCompanies: async function () {
    const allCompanies = await prisma.companies.findMany();
    return allCompanies;
  },
};
