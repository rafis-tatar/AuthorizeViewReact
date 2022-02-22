import React from 'react';
import AuthorizedView from './Components/AuthView/AuthorizedView';
import AuthView from './Components/AuthView/AuthView';
import NonAuthorizedView from './Components/AuthView/NonAuthorizedView';
import Layout from "./Components/Layout";


function App() {  
    return(
      <AuthView>
        <AuthorizedView>
          <Layout/>
        </AuthorizedView>
        <NonAuthorizedView />
      </AuthView>  
    )
}

export default App;