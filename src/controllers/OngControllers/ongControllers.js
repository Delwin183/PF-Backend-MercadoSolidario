//bring in prisma

const prisma = require("../../db");
const { registerOfAUser } = require("../Auth/registrationController");

const isOng = require("./validationOng");

// ONG singup
module.exports = {
  signUp: async function (body) {
    const resultIsOng = await isOng(body);
    const hashPassword = await registerOfAUser(body);

    let {email, name, lastName, cuit, type_of_user, phone, amountEmployee} = body;

    //check
    if (resultIsOng.containErrors || hashPassword.containErrors) {
      throw new Error(resultIsOng || hashPassword);
    }

    const {ongName, country, province, address} = resultIsOng.dataOng

    const ong = await prisma.ong.create({
      data: {
        password: hashPassword.password,
        email,
        name,
        lastName,
        phone,
        ongName: ongName ? ongName : undefined,
        country: country ? country : undefined,
        province: province ? province : undefined,
        address: address ? address : undefined,
        amountEmployee: amountEmployee ? amountEmployee : undefined,
        cuit,
        type_of_user
      }
    });

    return {...ong, ...resultIsOng, dataOng: null};
     
  },
  getOngs: async function () {
    const users = await prisma.ong.findMany({
      where: {
        isActive: true,
      },
      include: {
        posts: true,
      },
    });
    return users;
  },
  logicDeleteONG: async function(id) {
    if(!id) {
      throw new Error("La id de la ONG ingresada no es correcta")
    }

    const result = await prisma.ong.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
      },
    });
    return result
  },
  getDeleteONGs: async function () {
    const result = await prisma.companies.findMany({
      where: {
        isActive: false,
      }
    });
    return result;
  },
};
