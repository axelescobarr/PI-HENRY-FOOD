import s from '../stylesComponents/Create.module.css';
import back from '../imagenes/back.png';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postRecipe, getRecipes } from '../Redux/action';

export default function Create(props) {

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [summary, setSummary] = useState("");
    const [steps, setSteps] = useState([]);
    const [hs, setHs] = useState("");
    const [image, setImage] = useState("");
    const [diets, setDiets] = useState([]);
    const [state, setState] = useState('');
    const [stateImage, setStateImage] = useState('');
    const [error, setError] = useState('');
    const [ok, setOk] = useState('');

    const nameHandler = (value) => {
        let name = value.target.value;

        if (name.length > 254){
            setError("The name cannot have more than 255 characters")
        }
        if((/[^a-zA-Z\s]/.test(name))) setError("The name cannot contain numbers or symbols");
        if(name.length < 254 && (!/[^a-zA-Z\s]/.test(name))){
            setError("");
        }
        setOk("");
        setName(name);
    };
    const summaryHandler = (value) => {
        let summary = value.target.value;
        if(summary.length > 254){
            setError("The summary cannot have more than 255 characters")
        }
        if(summary.length < 254){
        setError("");
        }
        setOk("");
        setSummary(summary);
    };

    const stepsHandler = (value) => {
        let step = value.target.value;
        if(step.length > 254){
            setError("The steps cannot have more than 255 characters")
        }
        if(step.length < 254){
        setError("");
        }
        setOk("");
        setSteps([step]);
    };

    const hsHandler = (value) => {
        let hs = value.target.value;
        setError("");
        setHs(hs);
    };

    const imageHandler = (value) => {
        let image = value.target.value;
        if(image.length > 254){
            setError("The URl of the images cannot have more than 255 characters")
        }
        if(image.length < 254){
            setError("");
        }
        setOk("");
        setImage(image);
    };

    const dietsHandler = (value) => {
        let diet = value.target.value;
        if(diet.length > 0) setError('');
        if(diets.includes(diet)) {setError("This diet is already added");
    }else{setDiets([...diets, diet]);
          setOk("");
          setState({name, summary, steps, image, healthScore: hs, dietss: [...diets, diet]})
          setStateImage({name, summary, steps, healthScore: hs, dietss: [...diets, diet]})
    }
    };

    const submitHandler = (e) => {
        if(!name) setError('Name is required')
        if(!summary) setError('Summary is required')
        if(!steps.length) setError('Steps are required')
        if(!hs) setError('HealthScore is required')
        if(!diets.length) setError('Minimally add one type of diet')
       
        if(name && summary && steps.length && hs && diets.length && error === ''){
            setName("");
            setSummary("");
            setSteps("");
            setHs("");
            setDiets([]);
            setImage("");
            dispatch(getRecipes());
            if(image){
                dispatch(postRecipe(state));
            }else{
                dispatch(postRecipe(stateImage));
            }
            setOk("Recipe created successfully");
        }
        e.preventDefault();
    };

    return(
        <div className={s.create}>
            <div className={s.btnContainer}>
                 <NavLink className='back' to= "/principal"><img alt='back' className={s.backImage} src={back}/> BACK</NavLink>
            </div>
            <div className={s.formContainer}>
                  <form onSubmit={submitHandler} className={s.form}>
                    <div className={s.textContainer}>
                        <h1>ADD NEW RECIPE</h1>
                    </div>
                    <div className={s.inputsContainer}>
                        <div className={s.input}>
                            <label className={s.label}>* ADD YOUR RECIPE NAME</label>
                             <input value={name} onChange={nameHandler} type='text' name='name' key='name'/>
                        </div>
                        <div  className={s.input}>
                            <label className={s.label}>* ADD YOUR RECIPE SUMMARY</label>
                             <input value={summary} onChange={summaryHandler} type='text' name='description' key='description'/>
                        </div>
                        <div  className={s.input}>
                            <label className={s.label}>* ADD YOUR RECIPE STEPS</label>
                             <input value={steps} onChange={stepsHandler} type='text' name='steps' key='steps'/>
                        </div>
                        <div className={s.input}>
                            <label className={s.label}>* HEALTHSCORE: {hs}</label>
                             <input class='range' value={hs} onChange={hsHandler} type='range' min="0" max="100" name='description' key='description'/>
                        </div>
                        <div className={s.input}>
                            <label className={s.label}>ADD YOUR IMAGE URL</label>
                             <input value={image} onChange={imageHandler} type='text' name='url' key='url'/>
                        </div>
                        <div className={s.input}>
                            <label className={s.label}>* ADD YOUR DIET TYPES</label>
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
                            <h3 className={s.errorText}>{error}</h3>
                        </div>}
                        { ok && <div className={s.okContainer}>
                            <h3 className={s.okText}>{ok}</h3>
                        </div>}
                        </div>
                        { diets.length && <div className={s.dietsContainer}>
                            {diets.length && diets.map(diet => <p key={diet} className={s.diet}>{diet}</p>)}
                        </div>}
                        {!error && <div className={s.submitContainer}>
                             <input className={s.submit} type='submit' value='SUBMIT'/>
                        </div>}
                    </div>
                  </form>
            </div>
        </div>
    )
}