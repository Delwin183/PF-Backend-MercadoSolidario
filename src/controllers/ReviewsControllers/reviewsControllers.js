const prisma = require("../../db");
const allUsersTypes = require("../AllUsersControllers/allUsersControllers");

module.exports = {
  registerReview: async function (body) {
    const { type_of_user, id, comment, puntuacion } = body;
    if (type_of_user == "user") {
      const review = await prisma.review.create({
        data: {
          userIDs: id,
          comment,
          puntuacion,
        },
      });
      return { ...review };
    }
    if (type_of_user == "ong") {
      const review = await prisma.review.create({
        data: {
          ongIDs: id,
          comment,
          puntuacion,
        },
      });
      return { ...review };
    }
    if (type_of_user == "company") {
      const review = await prisma.review.create({
        data: {
          companyIDs: id,
          comment,
          puntuacion,
        },
      });
      return { ...review };
    }

    return null;
  },
  getReviews: async function () {
    const result = await allUsersTypes();
    const filtered = result.data
      .filter((e) => e.type_of_user !== "admin")
      .filter((element) => element.reviews.length !== 0);
    const selecction = filtered.map((element) => {
      const object = {
        name: element.name,
        lastName: element.lastName,
        image: element.image,
        type_of_user: element.type_of_user,
        puntuacion: element.reviews[0].puntuacion,
        comment: element.reviews[0].comment,
      };
      return object;
    });
    return selecction;
  },
};
