const express = require("express");
const router = express.Router();

const {registerReview, getReviews} = require("../../controllers/ReviewsControllers/reviewsControllers");

router.get("/", async(req,res) => {
    try {
        const reviews = await getReviews(req.body);
        res.status(200).send(reviews);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.post("/newreview", async(req,res) => {
    try {
        const newReview = await registerReview(req.body);
        res.status(200).send(newReview);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
