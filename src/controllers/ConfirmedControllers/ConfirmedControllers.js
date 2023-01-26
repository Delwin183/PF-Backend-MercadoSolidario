const prisma = require("../../db");

module.exports = {
    registerInPost: async function (body) {
      
      const postConfirmed = await prisma.confirmed.create({
        data: body,
      });
      return {...postConfirmed};
    },
    getConfirmed: async function () {
      const allConfirmed = await prisma.confirmed.findMany();
      return allConfirmed;
    },
  };
  