import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import AuthorizedView from './Components/AuthView/AuthorizedView';
import AuthView from './Components/AuthView/AuthView';
import NonAuthorizedView from './Components/AuthView/NonAuthorizedView';
import Menu from './Components/MenuComponent/Menu';
import Login from './Pages/Login';
import Routings from './Routing/Routings';
import routes from './Routing/routs';
import Layout from "./Components/Layout";


function App() {  
    return(
      <AuthView>
        <AuthorizedView>
          <Layout/>
        </AuthorizedView>
        <NonAuthorizedView />
        <Login/>
      </AuthView>  
    )
}

export default App;