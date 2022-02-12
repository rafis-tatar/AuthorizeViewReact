import React, { Component, ReactElement } from 'react'
import IAuthorizedProps from './AuthorizedView';
import INonAutorizedProps from './NonAutorizedView';

interface AuthViewProps {
    children?:
         | ReactElement<INonAutorizedProps>
         | Array<ReactElement<INonAutorizedProps>>
         | ReactElement<IAuthorizedProps>
         | Array<ReactElement<IAuthorizedProps>>
}
 
interface AuthViewState {
    isAutorize:boolean
}
 
class AuthView extends React.Component<AuthViewProps> {
    constructor(props: AuthViewProps) {
        super(props);
        this._isAutorizated = false;
    }

private _isAutorizated : boolean;
public get isAutorizated() : boolean {
    return this._isAutorizated;
}
public set isAutorizated(v : boolean) {
    this._isAutorizated = v;
}

       
    render(): React.ReactNode {
        var accessToken = localStorage.getItem("accessToken")
        if (accessToken)
        {       
            this.isAutorizated = true;
        
        }

        const autorized = (this.props.children as Array<any>).filter(a=>a.type.name === 'AutorizedView');
        const noneAutorized = (this.props.children as Array<any>).filter(a=>a.type.name === 'NonAutorizedView');

        if (this.isAutorizated)
        {
            return (<>{autorized}</>);    
        }
        else 
        {
            return (<>{noneAutorized}</>);    
        }      
    }        
} 
export default AuthView;