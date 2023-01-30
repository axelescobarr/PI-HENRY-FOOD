import s from '../stylesComponents/NavbarPrincipal.module.css';
import github from '../imagenes/github.png';
import linkedin from '../imagenes/linkedin.png';
import { NavLink } from 'react-router-dom';
import lupa from '../imagenes/lupa.png';
import { useState} from 'react';
import { useDispatch } from 'react-redux';
import { getRecipesName, setNameDetail, deleteDietsFilter } from '../Redux/action';

export default function NavbarPrincipal(props) {

    const dispatch = useDispatch()

    const [name, setName] = useState('');

    const searchName = () => {
        dispatch(getRecipesName(name))
        dispatch(setNameDetail(name))
        dispatch(deleteDietsFilter())
        setName('');
    } 

    const nameHandler = (name) => {
        setName(name.target.value);
    }

    return(
        <div className={s.navbar}>
            <div className={s.logo}>
                <h1 className={s.wiki}>WIKI</h1>
                <h1 className={s.food}>FOODS</h1>
            </div>
            <div className={s.componentsNavbar}>
                <div className={s.icons}>
                    <a target='_blank' href='https://github.com/axelescobarr'><img className={s.github} src={github} alt='github'/></a>
                    <a target='_blank' href='https://www.linkedin.com/in/axel-escobar-schneider-65177a204/'><img className={s.linkedin} src={linkedin} alt='linkedin'/> </a>
                </div>
                <div className={s.search}>
                    <input onChange={nameHandler} value={name} className={s.searchInput} type="text" placeholder='Search recipes...'></input>
                    <button className={s.lupaContainer} onClick={searchName}><img className={s.lupa} src={lupa} alt='Icono busqueda'/></button>
                </div>
                <div className={s.buttonsContainer}>
                    <NavLink class='navbarLink' to= "/aboutus">About Us</NavLink>
                    <NavLink class='navbarLink' to= "/diets">Diet Types</NavLink>
                    <NavLink class='navbarLink' to= "/create">New Recipe</NavLink>
                </div>
            </div>
        </div>
    )
}