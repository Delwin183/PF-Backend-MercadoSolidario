const prisma = require("../../db");
const { isCompany } = require("./validationCompanies");

module.exports = {
  signUp: async function (body) {
    const resultIsCompany = await isCompany(body);

    //check
    if (resultIsCompany.containErrors) {
      throw new Error(resultIsCompany);
    }

    const company = await prisma.companies.create({
      data: body,
    });
    return { ...company, ...resultIsCompany };
  },
  getCompanies: async function () {
    const allCompanies = await prisma.companies.findMany({
      where: {
        isActive: true,
      },
    });
    return allCompanies;
  },
  logicDeleteCompany: async function (id) {
    if (!id) {
      throw new Error("La id de la empresa ingresado no es correcta");
    }

    const result = await prisma.companies.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
      },
    });
    return result;
  },
  getDeleteCompanies: async function () {
    const allCompanies = await prisma.companies.findMany({
      where: {
        isActive: false,
      },
    });
    return allCompanies;
  },

  UpdateCompanies: async (id, body) => {
    const { name, lastName, country, phone, companyName, amountEmployee } =
      body;

    const result = await prisma.companies.update({
      where: {
        id: id,
      },
      data: {
        name: name ? name : undefined,
        lastName: lastName ? lastName : undefined,
        country: country ? country : undefined,
        companyName: companyName ? companyName : undefined,
        phone: phone ? phone : undefined,
        ongName: ongName ? ongName : undefined,
      },
    });
    return { result, message: "Datos actualizados." };
  },
};
