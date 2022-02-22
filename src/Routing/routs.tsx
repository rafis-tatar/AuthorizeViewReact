import First from '../Pages/First/First';
import Login from '../Pages/Login';
import Main from '../Pages/Main/Main';
import Second from '../Pages/Second/Second';
import {Navigate} from "react-router-dom";

const routes = {
  authorized : [
    {path:'/', component: <Main/> },
    {path:'/first', component:<First/>},
    {path:'/second', component: <Second/>},
    {path: "*",component: <Navigate to={"/"} />}
  ], 
  noneAuthorized:[
    {path:'/login', component: <Login/>}
  ]
 };
export default routes;