import React, { Suspense } from 'react'
import First from '../Pages/First/First';
import Login from '../Pages/Login/login';
import Main from '../Pages/Main/Main';
import Second from '../Pages/Second/Second';
import { IRoutingsProp } from './Routings';

const routes = {
  autorized : [
    {path:'/', component: <Main/> },
    {path:'/first', component:<First/>},
    {path:'/second', component: <Second/>},
    
  ], 
  noneautorized:[
    {path:'/login', component: <Login/>}
  ]
 };
export default routes;