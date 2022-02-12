import React from 'react';
import { Route, Routes} from 'react-router-dom'

export interface IRoutingsProp{
    path:string;
    component: JSX.Element | React.ComponentType;
}
export interface IRoutngs{
    routes:IRoutingsProp[]
}

function Routings({routes}:IRoutngs)
{
    return(
        <Routes>
           {
            routes.map((route, i) => 
                {
                    const r=  route.component ? (                        
                        <Route key={i} path={`${route.path}`} element = {route.component} />
                    ) : null;
                    return r;
                })
            }             
        </Routes>
    );   
}

export default Routings;