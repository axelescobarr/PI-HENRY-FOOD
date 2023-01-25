import s from '../stylesComponents/InitialComponent.module.css';
import logo from '../imagenes/vintage-food-restaurant-logo-design-free-vector.webp';
import { getRecipes } from '../Redux/action';
import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";


export class InitialComponent extends Component {

    componentDidMount(){
        this.props.getRecipes();
    }

    render(){
    return(
        <div className={s.initialContainer}>
            {console.log(this.props.recipes)}
            <img className={s.imageLogo} src={logo}/>
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
        getRecipes: () => dispatch(getRecipes())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialComponent);
