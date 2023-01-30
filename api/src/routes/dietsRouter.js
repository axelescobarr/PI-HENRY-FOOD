const {Router} = require("express");
const {getDiets, postDiet} = require("../controllers/dietsControllers")

const dietsRouter = Router();

dietsRouter.get("/", async (req, res) => {
    
    try {
        const diets = await getDiets();
        res.status(200).json(diets)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

dietsRouter.post("/", async (req, res) => {
    const {name} = req.body;
        try {
        const newDiet = await postDiet({name});
        res.status(200).json(newDiet);
    } catch (error) {
        res.status(400).json({error: error.message})       
    }
});

module.exports = dietsRouter;