import s from '../stylesComponents/Card.module.css';
import { NavLink } from 'react-router-dom';

export default function Page(props) {
    return(
        <div className={s.caja}>
            <div className={s.textImage}>
                <div className={s.titleContainer}>
                    <h2 className={s.title}>{props.name}</h2>
                </div>
                <img className={s.img} src={props.image} alt='recipe'/>
            </div>
            <div className={s.hsContainer}>
                <h3>HEALTHSCORE:   {props.healthScore}</h3>
            </div>
            <div className={s.diets}>
                {props.dietss.length && props.dietss.map(diet => <NavLink className='cardDietLink' to= "/diets">{diet}</NavLink>)}
            </div>
            <div>
                <NavLink class='cardLink' to= {`/details/${props.id}`} >VIEW DETAILS</NavLink>
            </div>
        </div>
    )
}

<NavLink className='textLink' to= "/allcharacters">All the characters</NavLink>