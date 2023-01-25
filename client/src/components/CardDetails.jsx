import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeId } from "../Redux/action";
import { NavLink } from "react-router-dom";
import s from '../stylesComponents/CardDetails.module.css';
import back from '../imagenes/back.png';


export default function CardDetail(props){

    const recipeDetail = useSelector((state) => state.recipeDetail)
    const recipe = recipeDetail[0]
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(getRecipeId(params.recipeId))
    },[params])

    return recipeDetail.length >= 1 && recipeDetail !== undefined ? (
        <div className={s.container}>
            <div className={s.btnContainer}>
                 <NavLink className='back' to= "/principal"><img className={s.backImage} src={back}/> BACK</NavLink>
            </div>
            <div className={s.detailsContainer}>
                <div className={s.imgInfoContainer}>
                    <h2 className={s.title}>{recipe.name}</h2>
                    <img className={s.image} src={recipe.image} alt="Recipes image"/>
                    <h3 className={s.hs}>HealthScore: {recipe.healthScore}</h3>
                    <div className={s.dietsContainer}>
                        {recipe.dietss.map(diet => <h3 className={s.diet}>{diet}</h3>)}
                    </div>
                </div>
                <div className={s.infoContainer}>
                    <div className={s.summaryContainer}>
                        <h2 className={s.titleSummary}>SUMMARY</h2>
                        <p className={s.summary} dangerouslySetInnerHTML={{ __html: recipe.summary }} />
                    </div>
                    <div className={s.stepsContainer}>
                        <div className={s.stepContent}>
                        <NavLink className='steps' to= {`/details/${recipe.id}/steps`}>SHOW THE STEPS</NavLink>
                            {/* <p className={s.step}>{recipe.steps.map(step => <p><b className={s.number}>{step.number}</b>  {step.step}</p>)}</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div>
            <h1>hola cd</h1>
        </div>
    )
}