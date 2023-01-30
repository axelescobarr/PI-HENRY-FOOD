import s from '../stylesComponents/Create.module.css';
import back from '../imagenes/back.png';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postRecipe, getRecipes } from '../Redux/action';

export default function Create(props) {

    const dietsDB = useSelector((state) => state.diets)
    

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [summary, setSummary] = useState("");
    const [steps, setSteps] = useState([]);
    const [hs, setHs] = useState("");
    const [image, setImage] = useState("");
    const [diets, setDiets] = useState([]);
  
    const [errorName, setErrorName] = useState('');
    const [errorSummary, setErrorSummary] = useState('');
    const [errorSteps, setErrorSteps] = useState('');
    const [errorHs, setErrorHs] = useState('');
    const [errorImage, setErrorImage] = useState('');
    const [errorDiets, setErrorDiets] = useState('');

    const [ok, setOk] = useState('');

    const nameHandler = (value) => {
        let name = value.target.value;

        if (name.length > 254){
            setErrorName("The name cannot have more than 255 characters")
        }
        if((/[^a-zA-Z\s]/.test(name))) setErrorName("The name cannot contain numbers or symbols");
        if(name.length < 254 && (!/[^a-zA-Z\s]/.test(name))){
            setErrorName("");
        }
        setOk("");
        setName(name);
    };

    const summaryHandler = (value) => {
        let summary = value.target.value;
        if(summary.length > 254){
            setErrorSummary("The summary cannot have more than 255 characters")
        }
        if(summary.length < 254){
            setErrorSummary("");
        }
        setOk("");
        setSummary(summary);
    };

    const stepsHandler = (value) => {
        let step = value.target.value;
        if(step.length > 254){
            setErrorSteps("The steps cannot have more than 255 characters")
        }
        if(step.length < 254){
        setErrorSteps("");
        }
        setOk("");
        setSteps([step]);
    };

    const hsHandler = (value) => {
        let hs = value.target.value;
        setErrorHs("");
        setHs(hs);
    };

    const imageHandler = (value) => {
        let image = value.target.value;
        if(image.length > 254){
            setErrorImage("The URl of the images cannot have more than 255 characters")
        }
        if(image.length < 254){
            setErrorImage("");
        }
        setOk("");
        setImage(image);
    };

    const dietsHandler = (value) => {
        let diet = value.target.value;
        if(diet.length > 0) setErrorDiets('');
        if(diets.includes(diet)) {setErrorDiets("This diet is already added");
    }else{
            setDiets([...diets, diet]);
            setOk("");
    }
    };

    const submitHandler = (e) => {
        if(!name) setErrorName('Name is required')
        if(!summary) setErrorSummary('Summary is required')
        if(!steps.length) setErrorSteps('Steps are required')
        if(!hs) setErrorHs('HealthScore is required')
        if(!diets.length) setErrorDiets('Minimally add one type of diet')
       
        if(name && summary && steps.length && hs && diets.length && errorName === '' && errorSummary === '' && errorSteps === '' && errorHs === '' && errorImage === '' && errorDiets === ''){
            setName("");
            setSummary("");
            setSteps("");
            setHs("");
            setDiets([]);
            setImage("");
            dispatch(getRecipes());
            if(image){
                dispatch(postRecipe({name, summary, steps, image, healthScore: hs, dietss: diets}));
            }else{
                dispatch(postRecipe({name, summary, steps, healthScore: hs, dietss: diets}));
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
                             {errorName && <div className={s.errorContainer}>
                                <h3 className={s.errorText}>{errorName}</h3>
                            </div>}
                        </div>
                        
                        <div  className={s.input}>
                            <label className={s.label}>* ADD YOUR RECIPE SUMMARY</label>
                            <input value={summary} onChange={summaryHandler} type='text' name='description' key='description'/>
                            {errorSummary && <div className={s.errorContainer}>
                                <h3 className={s.errorText}>{errorSummary}</h3>
                            </div>}
                        </div>
                        
                        <div  className={s.input}>
                            <label className={s.label}>* ADD YOUR RECIPE STEPS</label>
                            <input value={steps} onChange={stepsHandler} type='text' name='steps' key='steps'/>
                            {errorSteps && <div className={s.errorContainer}>
                                <h3 className={s.errorText}>{errorSteps}</h3>
                            </div>}
                        </div>
                        
                        <div className={s.input}>
                            <label className={s.label}>* HEALTHSCORE: {hs}</label>
                             <input class='range' value={hs} onChange={hsHandler} type='range' min="0" max="100" name='description' key='description'/>
                            {errorHs && <div className={s.errorContainer}>
                                <h3 className={s.errorText}>{errorHs}</h3>
                            </div>}
                        </div>
                        
                        <div className={s.input}>
                            <label className={s.label}>ADD YOUR IMAGE URL</label>
                            <input value={image} onChange={imageHandler} type='text' name='url' key='url'/>
                            {errorImage && <div className={s.errorContainer}>
                                <h3 className={s.errorText}>{errorImage}</h3>
                            </div>}
                        </div>
                        
                        <div className={s.input}>
                            <label className={s.label}>* ADD YOUR DIET TYPES</label>
                            <select multiple={false} value={diets} onChange={dietsHandler} className={s.dietSelect} name='typesDiet' key="diets">
                                 <option >Select...</option>
                                 {/* <option value="gluten free">Gluten free</option>
                                 <option value="ketogenic">Ketogenic</option>
                                 <option value="lacto ovo vegetarian">Lacto-ovo Vegetarian</option>
                                 <option value="vegan">Vegan</option>
                                 <option value="paleolithic">Paleolithic</option>
                                 <option value="primal">Primal</option>
                                 <option value="whole 30">Whole 30</option>
                                 <option value="pescatarian">Pescatarian</option>
                                 <option value="dairy free">Dairy free</option> */}
                                {dietsDB.length && dietsDB.map(d => <option value={d.name}>{d.name}</option>)}

                            </select>
                        {errorDiets && <div className={s.errorContainer}>
                           <h3 className={s.errorText}>{errorDiets}</h3>
                        </div>}

                        {ok && <div className={s.okContainer}>
                            <h3 className={s.okText}>{ok}</h3>
                        </div>}
                        
                        </div>
                        {diets.length && <div className={s.dietsContainer}>
                            {diets.length && diets.map(diet => <p key={diet} className={s.diet}>{diet}</p>)}
                        </div>}
                        {!errorName && !errorSummary&& !errorSteps && !errorHs && !errorImage && <div className={s.submitContainer}>
                             <input className={s.submit} type='submit' value='SUBMIT'/>
                        </div>}
                    </div>
                  </form>
            </div>
        </div>
    )
}