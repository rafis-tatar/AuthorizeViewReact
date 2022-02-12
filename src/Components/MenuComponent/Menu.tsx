import React from 'react';
import { Link } from 'react-router-dom';

function Menu()
{
    return (
        <nav>
           <ul>
             <li>
               <Link to="/">Главная</Link>               
             </li>
             <li>
               <Link to="/first">Первая</Link>
             </li>
             <li>
               <Link to="/second">Вторая</Link>
             </li>
           </ul>
         </nav>
    );
}
export default Menu;