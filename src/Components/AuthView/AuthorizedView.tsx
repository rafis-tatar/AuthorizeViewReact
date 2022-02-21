import { FC, ReactChild } from 'react';

interface IAuthorizedProps 
{
    children?:
    | ReactChild
    | ReactChild[];
} 
// interface IAuthorizedState
// { 

// } 

const AutorizedView : FC<IAuthorizedProps> = ({ children } : IAuthorizedProps) => {

  return (
    <div>
      { children }
    </div>
  )
}

// class AutorizedView extends React.Component<IAuthorizedProps,IAuthorizedState> {
//     constructor(props: IAuthorizedProps) {
//         super(props);
//         this.state = {};
//     }
//     render() { 
//         return(<>{this.props.children}</>);
//     }
// }
 


export default AutorizedView;
