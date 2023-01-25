import s from '../stylesComponents/About.module.css';
import img from '../imagenes/Fondos de pantalla de comida - FondosMil_files/35742.jpg'
import back from '../imagenes/back.png';
import { NavLink } from 'react-router-dom';

export default function About(props) {
    return(
        <div className={s.principalContainer}>
            <div className={s.btnContainer}>
                 <NavLink className='back' to= "/principal"><img className={s.backImage} src={back}/> BACK</NavLink>
            </div>
            <div className={s.targets}>
                <div className={s.imgContainer}>
                    {/* <img src={img} className={s.img}/> */}
                </div>
                <div className={s.target}>
                    <div className={s.border}>
                        <h1 className={s.title}>ACCOMPANYING YOU SINCE 2023</h1>
                        <p className={s.text}>Hello! We are WIKIFOOD, we are a web page created especially for you who are a lover of gastronomy and you like to cook different recipes every day, in WIKIFOOD you can find more than 5000 recipes of different types for all types of diets.
We are the food wikipedia.</p>
                    </div>
                </div>
            </div>
        </div>

    )
}