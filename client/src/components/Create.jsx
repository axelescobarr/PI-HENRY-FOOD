import s from '../stylesComponents/Create.module.css';
import back from '../imagenes/back.png';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postRecipe } from '../Redux/action';
import axios from 'axios';

export default function Create(props) {

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [summary, setSummary] = useState("");
    const [steps, setSteps] = useState([]);
    const [hs, setHs] = useState("");
    const [image, setImage] = useState("");
    const [diets, setDiets] = useState([]);
    const [state, setState] = useState('');
    const [error, setError] = useState("");

    const nameHandler = (value) => {
        let name = value.target.value;
        if (name.length > 254){
            setError("El nombre no puede tener mas de 255 caracteres.")
        }
        if(name.length < 254){
            setError("");
            }
        setName(name);
    };
    const summaryHandler = (value) => {
        let summary = value.target.value;
        if(summary.length > 254){
            setError("El resumen no puede tener mas de 255 caracteres.")
        }
        if(summary.length < 254){
        setError("");
        }
        setSummary(summary);
    };

    const stepsHandler = (value) => {
        let step = value.target.value;
        if(step.length > 254){
            setError("Los steps no puede tener mas de 255 caracteres.")
        }
        if(step.length < 254){
        setError("");
        }
        setSteps([...steps, step]);
    };

    const hsHandler = (value) => {
        let hs = value.target.value;
        setHs(hs);
    };

    const imageHandler = (value) => {
        let image = value.target.value;
        setImage(image);
    };

    const dietsHandler = (value) => {
        let diet = value.target.value;
        setDiets([...diets, diet]);
        setState({name, summary, steps, image, healthScore: hs, dietss: [...diets, diet]})
    };

    const submitHandler = (e) => {
        // setState({name, summary, steps, image, healthScore: hs, dietss: diets})
        console.log(state);
        setName("");
        setSummary("");
        setSteps("");
        setHs("");
        setDiets([]);
        setImage("");
        e.preventDefault();
        dispatch(postRecipe(state));
    };

    return(
        <div className={s.create}>
            <div className={s.btnContainer}>
                 <NavLink className='back' to= "/principal"><img className={s.backImage} src={back}/> BACK</NavLink>
            </div>
            <div className={s.formContainer}>
                  <form onSubmit={submitHandler} className={s.form}>
                    <div className={s.textContainer}>
                        <h1>ADD NEW RECIPE</h1>
                    </div>
                    <div className={s.inputsContainer}>
                        <div className={s.input}>
                            <label className={s.label}>ADD YOUR RECIPE NAME</label>
                             <input value={name} onChange={nameHandler} type='text' name='name' key='name'/>
                             {console.log(state)}
                        </div>
                        <div  className={s.input}>
                            <label className={s.label}>ADD YOUR RECIPE DESCRIPTION</label>
                             <input value={summary} onChange={summaryHandler} type='text' name='description' key='description'/>
                        </div>
                        <div  className={s.input}>
                            <label className={s.label}>ADD YOUR RECIPE STEPS</label>
                             <input value={steps} onChange={stepsHandler} type='text' name='steps' key='steps'/>
                        </div>
                        <div className={s.input}>
                            <label className={s.label}>HEALTHSCORE: {hs}</label>
                             <input class='range' value={hs} onChange={hsHandler} type='range' min="0" max="100" name='description' key='description'/>
                        </div>
                        <div className={s.input}>
                            <label className={s.label}>ADD YOUR IMAGE URL</label>
                             <input value={image} onChange={imageHandler} type='text' name='url' key='url'/>
                        </div>
                        <div className={s.input}>
                            <label className={s.label}>ADD YOUR DIET TYPES</label>
                            <select multiple={false} value={diets} onChange={dietsHandler} className={s.dietSelect} name='typesDiet' key="diets">
                                 <option >Select...</option>
                                 <option value="gluten free">Gluten free</option>
                                 <option value="ketogenic">Ketogenic</option>
                                 <option value="lacto ovo vegetarian">Lacto-ovo Vegetarian</option>
                                 <option value="vegan">Vegan</option>
                                 <option value="paleolithic">Paleolithic</option>
                                 <option value="primal">Primal</option>
                                 <option value="whole 30">Whole 30</option>
                                 <option value="pescatarian">Pescatarian</option>
                                 <option value="dairy free">Dairy free</option>
                            </select>
                        { error && <div className={s.errorContainer}>
                            <h3>{error}</h3>
                        </div>}
                        </div>
                        { diets.length && <div className={s.dietsContainer}>
                            {diets.length && diets.map(diet => <p key={diet} className={s.diet}>{diet}</p>)}
                        </div>}
                        <div className={s.submitContainer}>
                             <input className={s.submit} type='submit' value='SUBMIT'/>
                        </div>
                    </div>
                  </form>
            </div>
        </div>
    )
}