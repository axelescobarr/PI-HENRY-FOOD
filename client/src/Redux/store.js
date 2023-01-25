import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import  thunkMiddleware  from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
reducer,
composeEnhancer(applyMiddleware(thunkMiddleware))
);
//esto va a hacer las peticiones que redux no puede hacer es como una pequenia mejora del reducer para backend
export default store;
