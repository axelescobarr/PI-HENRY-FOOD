import { 
    GET_RECIPES, 
    ORDER_AZ, 
    ORDER_ZA,
    HS_AMAYOR,
    HS_AMENOR ,
    GET_RECIPES_API, 
    GET_RECIPES_DB, 
    GET_FILTER_DIET, 
    GET_RECIPES_NAME, 
    GET_RECIPE_ID, 
    POST_RECIPE,
    SET_NAME_DETAIL,
    SET_DIET} from "./action"

const initialState = {
    recipes: '',
    recipeDetail: '',
    nameDetail: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload.sort((a,b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
            }

        case ORDER_AZ:
            return{
                ...state,
                recipes: action.payload.sort((a,b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
            }

        case ORDER_ZA:
            return{
                ...state,
                recipes: action.payload.sort((a,b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0))
            }

        case HS_AMAYOR:
            return{
                ...state,
                recipes: action.payload.sort((a,b) => (a.healthScore > b.healthScore ? 1 : a.healthScore < b.healthScore ? -1 : 0))
            }

        case HS_AMENOR:
            return{
                ...state,
                recipes: action.payload.sort((a,b) => (a.healthScore > b.healthScore ? -1 : a.healthScore < b.healthScore ? 1 : 0))
            }

        case GET_RECIPES_API:
            return{
                ...state,
                recipes: action.payload
            }

        case GET_RECIPES_DB:
            return{
                ...state,
                recipes: action.payload
            }

        case GET_FILTER_DIET:
            return{
                ...state,
                recipes: action.payload.recipes.sort((a,b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)).filter(recipe => recipe.dietss.includes(action.payload.diet))
            }

        case GET_RECIPES_NAME:
            return{
                ...state,
                recipes: action.payload.sort((a,b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
            }

        case GET_RECIPE_ID:
            return{
                ...state,
                recipeDetail: action.payload
            }

        case POST_RECIPE:
            return{
                ...state,
            }

        case SET_NAME_DETAIL:
            return{
                ...state,
                nameDetail: action.payload
            }

        case SET_DIET:
            return{
                ...state
            }

        default:
            return{
                ...state
        }
    }
}

export default reducer;