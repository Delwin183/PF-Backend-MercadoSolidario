//bring in prisma

const prisma = require("../../db");

const isOng = require("./validationOng");

// ONG singup
module.exports = {
  signUp: async function (body) {
    const {
      name,
      lastName,
      country,
      phone,
      province,
      ongName,
      amountEmployee,
      ongCUIT,
    } = body;
    const resultIsOng = await isOng(ongCUIT);

    if (!name | !lastName | !country | !province | !ongName) {
        throw new Error("Please, provide all fields");
      }

    //check
    if (!resultIsOng.containErrors) {
      
      const ong = await prisma.ong.create({
        data: {
          name,
          lastName,
          phone,
          country,
          province,
          amountEmployee,
          ongName,
          ongCUIT,
        },
      });
      return {...ong, ...resultIsOng};
    } else {
      throw new Error (resultIsOng.message);
    }
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
