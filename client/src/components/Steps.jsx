import s from '../stylesComponents/Steps.module.css';
import back from '../imagenes/back.png';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";



export default function Page(props) {

    const recipeDetail = useSelector((state) => state.recipeDetail);
    const recipe = recipeDetail[0];

    return(
        <div className={s.container}>
            {recipe && <div className={s.btnContainer}>
                 <NavLink className='back' to= {`/details/${recipe.id}`}><img alt='back' className={s.backImage} src={back}/> BACK</NavLink>
            </div>}
            {recipe && <div className={s.stepsContainer}>
                {console.log(recipe.steps)}
                { recipe.steps.length > 1 && <p className={s.step}>{recipe.steps.map(step => <p><b className={s.number}>{step.number}</b>  {step.step}</p>)}</p>}
                { recipe.steps.length === 1 && <p className={s.step}>{recipe.steps.map(step => <p>{step}</p>)}</p>}
            </div>}
        </div>
    )
} 