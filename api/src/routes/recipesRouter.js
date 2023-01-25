const {Router} = require("express");
const {Recipe, Diet} = require("../db");
const {postRecipe, getAllRecipes, getRecipeById, getRecipeByName, getRecipesApi, getRecipesDb, getRecipesByDiet } = require("../controllers/recipesControllers");

const recipesRouter = Router();

recipesRouter.get("/", async (req, res) => {
    const {name, diet} = req.query;
    try {
      if(name) {
          const recipe = await getRecipeByName(name);
          // if (!recipe.length) {
          // res.status(400).json("No existe la receta con ese nombre")
        // }else{
        //   res.status(200).json(recipe)}
        }else{ 
        const recipes = await getAllRecipes();
        res.status(200).json(recipes);
      }
    } catch (error) {
      res.status(400).json({error: error.message})
    }
});

// if(diet){
//   const recipe = await getRecipesByDiet(diet)
//   if(!recipe.length){
//     res.status(400).json("No existe receta con esa dieta")
//   }else{
//     res.status(200).json(recipe)
//   }

recipesRouter.get("/api", async (req, res) => {
  try {
    const recipes = await getRecipesApi();
    res.status(200).json(recipes)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

recipesRouter.get("/db", async (req, res) => {
  try {
    const recipes = await getRecipesDb();
    res.status(200).json(recipes)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

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
  console.log(req.body)
    try {
        const { name, summary, healthScore, image, steps, dietss } = req.body;
        const nameCapitalize = name[0].toUpperCase() + name.substring(1);
        const newRecipe = await Recipe.create({
          name: nameCapitalize,
          summary,
          healthScore,
          image,
          steps,
          dietss
        });
        let getAllDiet = await Diet.findAll({
          where: {
            name: dietss
          }
        });
        newRecipe.addDiet(getAllDiet);
        return res.status(201).json(newRecipe);
      } catch (error) {
       res.status(400).json({error: error.message});
      }
    });

module.exports = recipesRouter; 