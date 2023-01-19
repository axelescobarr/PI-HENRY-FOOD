import {Route} from 'react-router-dom';
import PrincipalComponent from './components/PrincipalComponent';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import InitialComponent from './components/InitialComponent';


function App() {
  return (
    <div>
      <Route path='/'>
        <Navbar/>
      </Route>
      <Route exact path='/'>
        <InitialComponent/>
      </Route>
      <Route exact path='/principal'>
        <PrincipalComponent/>
      </Route>
      <Route path='/'>
        <Footer/>
      </Route>
    </div>
  );
}

export default App;
