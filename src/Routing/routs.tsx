import First from '../Pages/First/First';
import Main from '../Pages/Main/Main';
import Second from '../Pages/Second/Second';
import {Navigate} from "react-router-dom";
import { ComponentType } from "react";

export interface IRoutingProp {
  path:string;
  element: JSX.Element | ComponentType;
}

const routes:Array<IRoutingProp> = [
    {path:'/first', element:<First/>},
    {path:'/second', element: <Second/>},
    {path: "/login",element: <Navigate to={"/"} />},
    {path:'/', element: <Main/> }
 ];
export default routes;