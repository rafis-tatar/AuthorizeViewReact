import React from 'react'
import IAuthView from './AuthView'

interface INonAutorizedProps
{
    children?:
    | React.ReactChild
}
 
interface NonAutorizedViewState {
    
}
 
class NonAutorizedView extends React.Component<INonAutorizedProps, NonAutorizedViewState> {
    constructor(props: INonAutorizedProps) {
        super(props);
        this.state = {};
    }
    render() { 
        return ( <div>{this.props.children}</div>);
    }
}
 
export default NonAutorizedView;
