import {Route} from 'react-router-dom';
import PrincipalComponent from './components/PrincipalComponent';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import InitialComponent from './components/InitialComponent';
import NavbarPrincipal from './components/NavbarPrincipal';
import Create from './components/Create';
import Diets from './components/Diets';
import About from './components/About';
import CardDetail from './components/CardDetails';
import Steps from './components/Steps';
import Paginated from './components/Paginated';


function App() {
  return (
    <div>
      <Route exact path='/'>
        <Navbar/>
        <InitialComponent/>
      </Route>
      <Route exact path='/principal'>
        <NavbarPrincipal/>
        <PrincipalComponent/>
      </Route>
      <Route exact path='/create'>
        <Navbar/>
        <Create/>
      </Route>
      <Route exact path='/diets'>
        <Navbar/>
        <Diets/>
      </Route>
      <Route exact path='/aboutus'>
        <Navbar/>
        <About/>
      </Route>
      <Route exact path='/details/:recipeId'>
        <Navbar/>
        <CardDetail/>
      </Route>
      <Route exact path='/details/:recipeId/steps'>
        <Navbar/>
        <Steps/>
      </Route>
      <Route path='/'>
        <Footer/>
      </Route>
    </div>
  );
}

export default App;
