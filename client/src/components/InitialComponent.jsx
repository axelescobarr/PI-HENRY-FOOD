import s from '../stylesComponents/InitialComponent.module.css';
import logo from '../imagenes/vintage-food-restaurant-logo-design-free-vector.webp';
import { NavLink } from 'react-router-dom';

export default function InitialComponent(props) {
    return(
        <div className={s.initialContainer}>
            <img className={s.imageLogo} src={logo}/>
            <div className={s.logo}>
                <h1>WIKI</h1>
                <h1>FOODS</h1>
            </div>
            <li className='comeOn'><NavLink class='link' to= "/principal">COME ON</NavLink></li>
        </div>
    )
}