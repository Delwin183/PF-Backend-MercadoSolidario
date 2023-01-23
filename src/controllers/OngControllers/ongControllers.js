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
      include: {
        posts: true,
      },
    });
    return users;
  },
};
