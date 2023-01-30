import s from '../stylesComponents/Paginated.module.css';
import {nextPage, previousPage} from '../Redux/action';
import { useDispatch, useSelector } from 'react-redux';



export default function Paginated (props) {


    const page = useSelector((state) => state.page)
    const total = useSelector((state) => state.totalPages)
    
    const dispatch = useDispatch();


     const incrementPage = () =>{
        if(page >= total){
            return 0;}
        dispatch(nextPage())
    }
     
     const decrementPage = () =>{
        if(page <= 1){
            return 0;}
        dispatch(previousPage())
     }

     const diference = (dif) => {
        console.log(dif)
        if(dif > 0){
            if(page > 1){
                dispatch(previousPage())
            }
        }
     }

     return(
     <div className={s.pageContainer}>
        <button onClick={decrementPage} className={s.btn}><h1>&lt;</h1></button>
        <h1 className={s.pageText}>PAGE {page} FROM {total}</h1>
        <button onClick={incrementPage} className={s.btn}><h1>&gt;</h1></button>
        {page > total && diference(page-total)}
    </div>)
    
}