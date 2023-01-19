import s from '../stylesComponents/Navbar.module.css';
import github from '../imagenes/github.png';
import linkedin from '../imagenes/linkedin.png';
import { NavLink } from 'react-router-dom';

export default function Navbar(props) {
    return(
        <div className={s.navbar}>
            <div className={s.logo}>
                <h1 className={s.wiki}>WIKI</h1>
                <h1 className={s.food}>FOODS</h1>
            </div>
            <div className={s.icons}>
                <a target='_blank' href='https://github.com/axelescobarr'><img className={s.github} src={github} alt='github'/></a>
                <a target='_blank' href='https://www.linkedin.com/in/axel-escobar-schneider-65177a204/'><img className={s.linkedin} src={linkedin} alt='linkedin'/> </a>
            </div>
        </div>
    )
}