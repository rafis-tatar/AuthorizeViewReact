import First from '../Pages/First/First';
import Login from '../Pages/Login';
import Main from '../Pages/Main/Main';
import Second from '../Pages/Second/Second';

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