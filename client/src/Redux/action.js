import axios from 'axios';

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPES_API = "GET_RECIPES_API";
export const GET_RECIPES_DB = "GET_RECIPES_DB";
export const ORDER_AZ = "ORDER_AZ";
export const ORDER_ZA = "ORDER_ZA";
export const HS_AMAYOR = "HS_AMAYOR";
export const HS_AMENOR = "HS_AMENOR";
export const GET_FILTER_DIET = "GET_FILTER_DIET";
export const GET_RECIPES_NAME = "GET_RECIPES_NAME";
export const GET_RECIPE_ID = "GET_RECIPE_ID";
export const POST_RECIPE = "POST_RECIPE";
export const SET_NAME_DETAIL ="SET_NAME_DETAIL";
export const SET_DIET = "SET_DIET";

export const getRecipes = () => {
    return function(dispatch){
        fetch("http://localhost:3001/recipes")
        .then(res => res.json())
        .then(recipes => dispatch({type: GET_RECIPES, payload: recipes}))}}

export const getRecipesApi = () => {
    return function(dispatch){
        fetch("http://localhost:3001/recipes/api")
        .then(res => res.json())
        .then(recipes => recipes.sort((a,b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)))
        .then(recipes => dispatch({type: GET_RECIPES_API, payload: recipes}))}}

        export const getRecipesDb = () => {
    return function(dispatch){
        fetch("http://localhost:3001/recipes/db")
        .then(res => res.json())
        .then(recipes => recipes.sort((a,b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)))
        .then(recipes => dispatch({type: GET_RECIPES_DB, payload: recipes}))}}

export const orderAZ = (recipes) => {return({type: ORDER_AZ, payload: recipes})}

export const orderZA = (recipes) => {return({type: ORDER_ZA, payload: recipes})}

export const hsMayor = (recipes) => {return({type: HS_AMAYOR, payload: recipes})}

export const hsMenor = (recipes) => {return({type: HS_AMENOR, payload: recipes})}

export const getFilterDiet = (diet, recipes) => {return({type: GET_FILTER_DIET, payload: {recipes, diet}})}

export const setNameDetail = (name) => {return({type: SET_NAME_DETAIL, payload: name})}

export const getRecipesName = (name) => {
    return function(dispatch){
        fetch(`http://localhost:3001/recipes?name=${name}`)
        .then(res => res.json())
        .then(recipes => dispatch({type: GET_RECIPES_NAME, payload: recipes}))}}

export const getRecipeId = (id) => {
    return function(dispatch){
        fetch(`http://localhost:3001/recipes/${id}`)
        .then(res => res.json())
        .then(recipes => dispatch({type: GET_RECIPE_ID, payload: recipes}))}}

export const postRecipe = (recipe) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("http://localhost:3001/recipes", recipe)
            dispatch({type: POST_RECIPE, payload: response});
        } catch (error) {
            console.log(error);
        }}}

export const setDiet= (name) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("http://localhost:3001/diets", name)
            dispatch({type: SET_DIET, payload: response});
        } catch (error) {
            console.log(error);
        }}}