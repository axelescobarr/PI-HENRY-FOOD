import s from '../stylesComponents/Steps.module.css';
import back from '../imagenes/back.png';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";



export default function Page(props) {

    const recipeDetail = useSelector((state) => state.recipeDetail);
    const recipe = recipeDetail[0];

    return(
        <div className={s.container}>
            <div className={s.btnContainer}>
                 <NavLink className='back' to= {`/details/${recipe.id}`}><img className={s.backImage} src={back}/> BACK</NavLink>
            </div>
            <div className={s.stepsContainer}>
                <p className={s.step}>{recipe.steps.map(step => <p><b className={s.number}>{step.number}</b>  {step.step}</p>)}</p>
            </div>
        </div>
    )
}