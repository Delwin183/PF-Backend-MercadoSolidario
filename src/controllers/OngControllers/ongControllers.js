//bring in prisma

const prisma = require("../../db");

const isOng = require("./validationOng");

// ONG singup
module.exports = {
  signUp: async function (body) {
    const resultIsOng = await isOng(body);

    //check
    if (resultIsOng.containErrors) {
      throw new Error(resultIsOng);
    }
    const ong = await prisma.ong.create({
      data: body,
    });

    return {...ong, ...resultIsOng};
     
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
