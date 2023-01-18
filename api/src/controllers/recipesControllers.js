const axios = require("axios");
const { useRouteMatch } = require("react-router-dom");
const {Recipe} = require("../db");
const {API_KEY} = process.env;

const getRecipesApi = async () => {
    return ( 
        await axios
        //aca tengo que hacer la llamada a la api correspondiente pero estoy usando este mocky para no gastar las request limitadas.
        .get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5")
        .then(recipes => { 
            const recipesFilter = recipes.data.results.map(recipe => {
                return{
                    id: recipe.id,
                    name: recipe.title,
                    summary: recipe.summary,
                    image: recipe.image,
                    hS: recipe.healthScore,
                    diet: recipe.diets,
                    steps: recipe.analyzedInstructions[0]?.steps.map(step => {
                        return{
                            step: step.step,
                            number: step.number
                        }
                    })
                }
            })
            return recipesFilter;
        })
        .catch(error => {return error.message})
    )   
};

const getRecipesDb = async () => {
    try {
        const recipesDb = await Recipe.findAll();
        if(!recipesDb) throw new Error('No hay usuarios registrados por el momento');
        return recipesDb;
    } catch (error) {
        return error;
    }
};

const postRecipe = async (name, summary, healthScore, steps, image, diets) => {
    try {
        if(!name || !summary) throw new Error("Faltan datos obligatorios (name o summary)")
        const obj = {  
            name, 
            summary, 
            healthScore, 
            steps,
            image,
            diets
        } 
    
        await Recipe.create(obj);
        return obj; 
    } catch (error) {
        return error;
    }
    
};

const getAllRecipes = async () => {
    try {
        const recipesApi = await getRecipesApi();
        const recipesDb = await getRecipesDb();
        const allRecipes = recipesApi.concat(recipesDb);
        return allRecipes;
    } catch (error) {
        return error;
    }
};

const getRecipeByName = async (name) => {
    if (!name) throw new Error("Falta el nombre, no se puede buscar");
    if(name.length < 4) throw new Error("Nombre muy corto")
    name = name.toLowerCase();
    try {
        const allRecipes = await getAllRecipes();
        const recipe = allRecipes.filter(recip => recip.name.toLowerCase().includes(name) === true);
        return recipe;
    } catch (error) {
        return error;
    }
}

const getRecipeById = async(id) => {
    try {
        if(!id) throw new Error("Faltan datos por completar (id)")
        const allRecipes = await getAllRecipes();
        const recipe = allRecipes.filter(recipe => recipe.id === parseInt(id));
        return recipe;
    } catch (error) {
        return error;
    }
};

module.exports = {
    postRecipe,
    getAllRecipes,
    getRecipeById,
    getRecipeByName
}

