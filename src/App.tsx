import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import AutorizedView from './Components/AuthView/AuthorizedView';
import AuthView from './Components/AuthView/AuthView';
import NonAutorizedView from './Components/AuthView/NonAutorizedView';
import Menu from './Components/MenuComponent/Menu';
import Login from './Pages/Login/login';
import Routings from './Routing/Routings';
import routes from './Routing/routs';


function App() {  
    return(
      <AuthView>
        <AutorizedView>
          <Router>      
            <Menu/>        
            <Routings routes={routes.autorized}/>
          </Router> 
        </AutorizedView>
        <NonAutorizedView>
          <Login/>        
        </NonAutorizedView>
      </AuthView>       
    )
}

export default App;