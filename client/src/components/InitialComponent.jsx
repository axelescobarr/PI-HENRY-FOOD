import s from '../stylesComponents/InitialComponent.module.css';
import logo from '../imagenes/vintage-food-restaurant-logo-design-free-vector.webp';
import { getRecipes } from '../Redux/action';
import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import { connect} from "react-redux";
import { setDiet } from '../Redux/action';


export class InitialComponent extends Component {

    componentDidMount(){
        this.props.getRecipes();
        this.props.setDiet({name: "gluten free"})
        this.props.setDiet({name: "ketogenic"})
        this.props.setDiet({name: "lacto ovo vegetarian"})
        this.props.setDiet({name: "vegan"})
        this.props.setDiet({name: "paleolithic"})
        this.props.setDiet({name: "primal"})
        this.props.setDiet({name: "whole 30"})
        this.props.setDiet({name: "pescatarian"})
        this.props.setDiet({name: "dairy free"})

    }

    render(){
    return(
        <div className={s.initialContainer}>
            {console.log(this.props.recipes)}
            <img alt='logo' className={s.imageLogo} src={logo}/>
            <div className={s.logo}>
                <h1>WIKI</h1>
                <h1>FOODS</h1>
            </div>
            <li className='comeOn'><NavLink class='link' to= "/principal">COME ON</NavLink></li>
        </div>
    )
}}

export const mapStateToProps = (state) => {
    return{
      recipes: state.recipes
    }
  };

const mapDispatchToProps = (dispatch => {
    return{
        getRecipes: () => dispatch(getRecipes()),
        setDiet: (diet) => dispatch(setDiet(diet))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialComponent);
