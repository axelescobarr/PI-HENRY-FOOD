import s from '../stylesComponents/PrincipalComponent.module.css';
import { getRecipes, orderAZ, orderZA, hsMayor, hsMenor, getRecipesApi, getRecipesDb, getFilterDiet, setNameDetail, pagesTotal, getDiets, setDietsFilter, deleteDietsFilter } from '../Redux/action';
import Card from './Card';
import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import gif from '../imagenes/gifError.gif';
import Paginated from './Paginated';

export default function PrincipalComponent(props) {

    const recipes = useSelector((state) => state.recipes)
    const nameDetail = useSelector((state) => state.nameDetail)
    const page = useSelector((state) => state.page)
    const diets = useSelector((state) => state.diets)
    const dietsFilter = useSelector((state) => state.dietsFilter)

    const dispatch = useDispatch();

    const [alfabetico, setAlfabetico] = useState('A-Z');
    const [hs, setHs] = useState('');
    const [origin, setOrigin] = useState('');
    const [diet, setDiet] = useState('');

    const recipesPage = page * 9;
    const index = recipesPage - 9;
    const posts = recipes.slice(index, recipesPage);
    const totalPages = Math.ceil(recipes.length / 9);

    useEffect(() => {
        dispatch(pagesTotal(totalPages));
        dispatch(getDiets());
    },[recipes])

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
            dispatch(setNameDetail(""))
            dispatch(deleteDietsFilter())
            setDiet("All");
            setHs("Select");
            setAlfabetico("A-Z");
        }
        if(value.target.value === 'All'){
            dispatch(getRecipes())
            dispatch(setNameDetail(""))
            dispatch(deleteDietsFilter())
            setDiet("All");
            setHs("Select");
            setAlfabetico("A-Z");
        }
        if(value.target.value === 'Created'){
            dispatch(getRecipesDb())
            dispatch(setNameDetail(""))
            dispatch(deleteDietsFilter())
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
            dispatch(setDietsFilter(value.target.value))
        }
        
     }

     const resetFilter = () => {
        setAlfabetico("A-Z");
        setHs("");
        setDiet("");
        setOrigin("");
        dispatch(deleteDietsFilter());
        dispatch(setNameDetail(''));
        dispatch(getRecipes());
     }

    return(<div className={s.principalContainer}>
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
                        {diets.length && diets.map(d => <option value={d.name}>{d.name}</option>)}
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
            {(dietsFilter.length || nameDetail.length) && <div className={s.filterContainer}>
                {dietsFilter && dietsFilter.map(d => <p key={d} className={s.diet}>{d}</p>)}
                {nameDetail && <p className={s.nameDetail}>{nameDetail}</p>}
            </div>}
            {recipes.length > 0 && recipes !== undefined && <div className={s.paginatedContainer}>
                <Paginated/>
                <div className={s.cardsContainer}>
                    {posts.length && posts.map(recipe => <Card name={recipe.name} id={recipe.id} image={recipe.image} healthScore={recipe.healthScore} dietss={recipe.dietss}/>)}
                </div>
                <Paginated/>
            </div>}

            {(recipes.length <= 0 || recipes === undefined) && <div className={s.errorContainer}>
                <div className={s.errorContainerChild}>
                    <h2 className={s.errorText}>RECIPES NOT FOUND</h2>
                    <img src={gif} alt='Gif error'/>
                </div>
            </div>}         
        </div>)
}