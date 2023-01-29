const prisma = require("../../db");
const { registerOfAUser } = require("../Auth/registrationController");
const { isCompany } = require("./validationCompanies");

module.exports = {
  signUp: async function (body) {
    const hashPassword = await registerOfAUser(body);
    const resultIsCompany = await isCompany(body);

    let {
      email,
      name,
      rut,
      lastName,
      cuit,
      type_of_user,
      phone,
      amountEmployee,
    } = body;

    //check

    if (hashPassword.containErrors || resultIsCompany.containErrors) {
      throw new Error(JSON.stringify(hashPassword || resultIsCompany));
    }

    const { companyName, country, province, address } = resultIsCompany.dataOng;

    const company = await prisma.companies.create({
      data: {
        password: hashPassword.password,
        email,
        name,
        lastName,
        phone: phone ? phone : undefined,
        companyName: companyName ? companyName : undefined,
        country: country ? country : undefined,
        province: province ? province : undefined,
        address: address ? address : undefined,
        amountEmployee: amountEmployee ? amountEmployee : undefined,
        cuit,
        rut,
        type_of_user,
      },
    });

    return { ...company, ...resultIsCompany, dataOng: null };
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
    const data = Object.fromEntries(
      Object.entries(body).filter(([key, value]) => value)
    );
    const result = await prisma.companies.update({
      where: { id },
      data,
    });
    return { result, message: "Datos actualizados." };
  },
};
