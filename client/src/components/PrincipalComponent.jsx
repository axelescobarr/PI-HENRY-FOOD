import s from '../stylesComponents/PrincipalComponent.module.css';
import { getRecipes, orderAZ, orderZA, hsMayor, hsMenor, getRecipesApi, getRecipesDb, getFilterDiet, setNameDetail } from '../Redux/action';
import Card from './Card';
import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import gif from '../imagenes/gifError.gif';

export default function PrincipalComponent(props) {

    // const [recipes, setRecipes] = useState([]);
    const recipes = useSelector((state) => state.recipes)
    const nameDetail = useSelector((state) => state.nameDetail)
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [alfabetico, setAlfabetico] = useState('A-Z');
    const [hs, setHs] = useState('');
    const [origin, setOrigin] = useState('');
    const [diet, setDiet] = useState('');
    const [diets, setDiets] = useState([]);

    const numberOfRecipes = 9;
    const recipesPage = page * numberOfRecipes;
    const indexOfFirstPost = recipesPage - numberOfRecipes;
    const currentPosts = recipes.slice(indexOfFirstPost, recipesPage);
    const totalPages = Math.ceil(recipes.length / numberOfRecipes);

    useEffect(() => {
        // dispatch(getRecipes());
        setDiets([]);
    },[nameDetail])

    const incrementPage = () =>{
        if(page >= totalPages){
            return 0;
        }
        setPage(page + 1);
     }
     
     const decrementPage = () =>{
        if(page <= 1){
            return 0;
        }
        setPage(page - 1);
     }

     const handlerAlfabetico = (value) => {
        if(value.target.value === 'A-Z'){
            dispatch(orderAZ(recipes))
        }
        if(value.target.value === 'Z-A'){
            dispatch(orderZA(recipes))
        }
        setAlfabetico(value.target.value);
     }

     const handlerHS = (value) => {
        if(value.target.value === 'Ascending'){
            dispatch(hsMayor(recipes))
        }
        if(value.target.value === 'Descending'){
            dispatch(hsMenor(recipes))
        }
        setHs(value.target.value)
     }

     const handlerOrigin = (value) => {
        if(value.target.value === 'API'){
            dispatch(getRecipesApi())
            setDiet("All");
            setHs("Select");
            setAlfabetico("A-Z");
        }
        if(value.target.value === 'All'){
            dispatch(getRecipes())
            setDiet("All");
            setHs("Select");
            setAlfabetico("A-Z");
        }
        if(value.target.value === 'Created'){
            dispatch(getRecipesDb())
            setDiet("All");
            setHs("Select");
            setAlfabetico("A-Z");
        }
        setOrigin(value.target.value)
     }

     const handlerDiet = (value) => {
        if(value.target.value === 'all') {
            dispatch(getRecipes())
        }else{
            dispatch(getFilterDiet(value.target.value, recipes))
            setDiet(value.target.value);
            setDiets([...diets, value.target.value])
        }
        
     }

     const resetFilter = () => {
        setAlfabetico("A-Z");
        setHs("");
        setDiet("");
        setOrigin("");
        setDiets([]);
        dispatch(setNameDetail(''));
        dispatch(getRecipes());
     }

    return recipes.length > 0 && recipes !== undefined ? (
        <div className={s.principalContainer}>
            <div className={s.selects}>
                <div className={s.inputOrder}>
                <label>Alphabetical Order</label>
                    <select value={alfabetico} onChange={handlerAlfabetico} className={s.input} name='Ordenamiento' key="orden">
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                </div>
                <div className={s.inputDiet}>
                    <label>Type of Diet</label>
                    <select value={diet} onChange={handlerDiet} className={s.input} name='typesDiet' key="dietas">
                        <option value="all">All</option>
                        <option value="gluten free">Gluten free</option>
                        <option value="ketogenic">Ketogenic</option>
                        <option value="lacto ovo vegetarian">Lacto-ovo Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="paleolithic">Paleolithic</option>
                        <option value="primal">Primal</option>
                        <option value="whole 30">Whole 30</option>
                        <option value="pescatarian">Pescatarian</option>
                        <option value="dairy free">Dairy free</option>
                    </select>
                </div>
                <div className={s.inputHS}>
                    <label>HealtScore</label>
                    <select value={hs} className={s.input} onChange={handlerHS}  name='hS' key="healthScore">
                        <option value="Select">Select</option>
                        <option value="Ascending">Ascending</option>
                        <option value="Descending">Descending</option>
                    </select>
                </div>
                <div className={s.inputOrigin}>
                    <label>Origin Recipe</label>
                    <select value={origin} className={s.input} onChange={handlerOrigin} name='origin' key="originRecipe">
                        <option value="All">All</option>
                        <option value="API">API</option>
                        <option value="Created">Created</option>
                    </select>
                </div>
                <div className={s.buttonContainer}>
                    <button onClick={resetFilter} className={s.boton}>Reset Filters</button>
                </div>
            </div>
            {(diets.length || nameDetail.length) && <div className={s.filterContainer}>
                {diets && diets.map(d => <p key={d} className={s.diet}>{d}</p>)}
                {nameDetail && <p className={s.nameDetail}>{nameDetail}</p>}
            </div>}
            <div className={s.pageContainer}>
                <button onClick={decrementPage} className={s.btn}><h1>&lt;</h1></button>
                <h1 className={s.pageText}>PAGE {page} FROM {totalPages}</h1>
                <button onClick={incrementPage} className={s.btn}><h1>&gt;</h1></button>
            </div>
            <div className={s.cardsContainer}>
                {currentPosts.length && currentPosts.map(recipe => <Card name={recipe.name} id={recipe.id} image={recipe.image} healthScore={recipe.healthScore} dietss={recipe.dietss}/>)}
            </div>
            <div className={s.pageContainer}>
                <button onClick={decrementPage} className={s.btn}><h1>&lt;</h1></button>
                <h1 className={s.pageText}>PAGE {page} FROM {totalPages}</h1>
                <button onClick={incrementPage} className={s.btn}><h1>&gt;</h1></button>
            </div>
        </div>
    ) : (
        <div className={s.errorContainer}>
            <div className={s.selects}>
                <div className={s.inputOrder}>
                <label>Alphabetical Order</label>
                    <select value={alfabetico} onChange={handlerAlfabetico} className={s.input} name='Ordenamiento' key="orden">
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                </div>
                <div className={s.inputDiet}>
                    <label>Type of Diet</label>
                    <select value={diet} onChange={handlerDiet} className={s.input} name='typesDiet' key="dietas">
                        {console.log(diet)}
                        <option value="all">All</option>
                        <option value="gluten free">Gluten free</option>
                        <option value="ketogenic">Ketogenic</option>
                        <option value="lacto ovo vegetarian">Lacto-ovo Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="paleolithic">Paleolithic</option>
                        <option value="primal">Primal</option>
                        <option value="whole 30">Whole 30</option>
                        <option value="pescatarian">Pescatarian</option>
                        <option value="dairy free">Dairy free</option>
                    </select>
                </div>
                <div className={s.inputHS}>
                    <label>HealtScore</label>
                    <select value={hs} className={s.input} onChange={handlerHS}  name='hS' key="healthScore">
                        <option value="Select">Select</option>
                        <option value="Ascending">Ascending</option>
                        <option value="Descending">Descending</option>
                    </select>
                </div>
                <div className={s.inputOrigin}>
                    <label>Origin Recipe</label>
                    <select value={origin} className={s.input} onChange={handlerOrigin} name='origin' key="originRecipe">
                        <option value="All">All</option>
                        <option value="API">API</option>
                        <option value="Created">Created</option>
                    </select>
                </div>
                <div className={s.buttonContainer}>
                    <button onClick={resetFilter} className={s.boton}>Reset Filters</button>
                </div>
            </div>
                <div className={s.errorContainerChild}>
                    <h2 className={s.errorText}>RECIPES NOT FOUND</h2>
                    <img src={gif} alt='Gif error'/>
                </div>
        </div>
    )
}