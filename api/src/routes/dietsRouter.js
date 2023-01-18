const {Router} = require("express");
const { Diet } = require('../db');

const dietsRouter = Router();

dietsRouter.get("/", (req, res) => {
    return Diet.findAll().then(diets => {
        res.status(200).json(diets)
    })
})

dietsRouter.post("/", async (req, res) => {
    const {name} = req.body;
    const newDiet = await Diet.create({name});
    res.status(200).json(newDiet);
});
module.exports = dietsRouter;