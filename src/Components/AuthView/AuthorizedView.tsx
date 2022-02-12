import * as React from 'react';

interface IAuthorizedProps 
{
    children?:
    | React.ReactChild
    | React.ReactChild[];
} 
interface IAuthorizedState
{
       
} 
class AutorizedView extends React.Component<IAuthorizedProps,IAuthorizedState> {
    constructor(props: IAuthorizedProps) {
        super(props);
        this.state = {};
    }
    render() { 
        return(<>{this.props.children}</>);
    }
}
 


export default AutorizedView;
