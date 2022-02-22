import { FC, ReactChild } from 'react';

interface IAuthorizedProps 
{
    children?:
    | ReactChild
    | ReactChild[];
} 

const AuthorizedView : FC<IAuthorizedProps> = ({ children } : IAuthorizedProps) => {

  return (
    <div>
      { children }
    </div>
  )
}

 


export default AuthorizedView;
