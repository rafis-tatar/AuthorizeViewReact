import React from 'react';
import { Route, Routes} from 'react-router-dom'
import {IRoutingProp} from "./routs";


export interface IRouting {
    routes:Array<IRoutingProp>
}

function Routing({routes}:IRouting)
{
    return(
        <Routes>
            {
              routes.filter(elem => !!elem.element).map((route,i) => {
                return <Route key={i} {...route}/>
              })
            }
        </Routes>
      
    );   
}

export default Routing;