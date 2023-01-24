const prisma = require("../../db");

module.exports = {
    registerInPost: async function (body) {
    //   const resultIsCompany = await isCompany(body);
  
    //   //check
    //   if (resultIsCompany.containErrors) {
    //     throw new Error(resultIsCompany)
    //   }
      
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
  