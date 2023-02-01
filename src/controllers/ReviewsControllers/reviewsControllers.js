const prisma = require("../../db");

module.exports = {
    registerReview: async function (body) {
        const review = await prisma.review.create({
            data: body,
        });
        return {...review};
    },
    getReviews: async function() {
        result = await prisma.review.findMany();
        return result;
    }
}