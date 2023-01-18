const {Router} = require("express");
const {Recipe, Diet} = require("../db");
const {postRecipe, getAllRecipes, getRecipeById, getRecipeByName} = require("../controllers/recipesControllers");

const recipesRouter = Router();

recipesRouter.get("/", async (req, res) => {
    const {name} = req.query;
    try {
      if(name) {
          const recipe = await getRecipeByName(name);
          if (!recipe.length) {
            res.status(400).json("No existe la receta con ese nombre")
        } else{res.status(200).json(recipe)}
      }else{
      const recipes = await getAllRecipes();
      res.status(200).json(recipes);
      }
    } catch (error) {
      res.status(400).json({error: error.message})
    }
});

recipesRouter.get("/:id", async (req,res) => {
    const id = req.params.id;
    try {
      if(!id) throw new Error("Faltan datos necesarios para buscar (id)");
      const recipe = await getRecipeById(id);
      if (!recipe.length) {
        res.status(400).json("No existe la receta con ese id")
    } else{res.status(200).json(recipe)}
    } 
    catch (error) {
      res.status(400).json({error: error.message});
    }
});

recipesRouter.post("/", async (req, res) => {
    try {
        const { name, summary, healthScore, image, steps, diets } = req.body;
        const newRecipe = await Recipe.create({
          name,
          summary,
          healthScore,
          image,
          steps
        });
        let getAllDiet = await Diet.findAll({
          where: {
            name: diets
          }
        });
        newRecipe.addDiet(getAllDiet);
        return res.status(201).json(newRecipe);
      } catch (error) {
       res.status(400).json({error: error.message});
      }
    });

module.exports = recipesRouter; 