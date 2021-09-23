import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css' 

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Menu from './componentes/Menu';
import Home from './componentes/Home';
import Fornecedor from './componentes/fornecedor/Fornecedor';
import Mercadoria from './componentes/mercadoria/Mercadoria';

function App() {
  return (
    <Router>
        <Menu/>
        <Switch>
            <Route exact path="/" render={Home} />
            <Route exact path="/fornecedores" render={ () => 
              <Fornecedor/>
            } />
            <Route exact path="/mercadorias" render={ () => 
              <Mercadoria/>
            } />            
        </Switch>
    </Router>
  );
}

export default App;
