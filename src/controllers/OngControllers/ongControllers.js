//bring in prisma

const prisma = require("../../db");
const { registerOfAUser } = require("../Auth/registrationController");

const isOng = require("./validationOng");

// ONG singup
module.exports = {
  signUp: async function (body) {
    const hashPassword = await registerOfAUser(body);
    const resultIsOng = await isOng(body);

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
    if (hashPassword.containErrors) throw new Error(JSON.stringify(hashPassword));
    if (resultIsOng.containErrors) throw new Error(JSON.stringify(resultIsOng));

    const { ongName, country, province, address } = resultIsOng.dataOng;

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
        rut,
        type_of_user,
      },
    });

    return { ...ong, ...resultIsOng, dataOng: null };
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
  logicDeleteONG: async function (id) {
    if (!id) {
      throw new Error("La id de la ONG ingresada no es correcta");
    }

    const result = await prisma.ong.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
      },
    });
    return result;
  },
  getDeleteONGs: async function () {
    const result = await prisma.ong.findMany({
      where: {
        isActive: false,
      },
    });
    return result;
  },

  UpdateOng: async (id, body) => {
    const {
      name,
      lastName,
      phone,
      country,
      province,
      amountEmployee,
      ongName,
      address,
      cuit,
      email,
      rut,
      type_of_user,
    } = body;

    const result = await prisma.ong.update({
      where: {
        id: id,
      },
      data: {
        name: name ? name : undefined,
        lastName: lastName ? lastName : undefined,
        phone: phone ? phone : undefined,
        country: country ? country : undefined,
        province: province ? province : undefined,
        amountEmployee: amountEmployee ? amountEmployee : undefined,
        ongName: ongName ? ongName : undefined,
        address: address ? address : undefined,
        cuit: cuit ? cuit : undefined,
        email: email ? email : undefined,
        rut: rut ? rut : undefined,
        type_of_user: type_of_user ? type_of_user : undefined,
      },
    });
    return { result, message: "Datos actualizados." };
  },
};
