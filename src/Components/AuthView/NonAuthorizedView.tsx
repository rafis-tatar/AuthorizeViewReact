import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../../Pages/Login";

interface INonAuthorizedProps {
  children?:
  | React.ReactChild
}

interface NonAuthorizedViewState {

}

class NonAuthorizedView extends React.Component<INonAuthorizedProps, NonAuthorizedViewState> {
  constructor(props: INonAuthorizedProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <Routes>
          <Route path={"/"} element={<Login/>} />
          <Route path="*" element={<Navigate to={"/"} replace={true}/>}/>
        </Routes>
    );
  }
}

export default NonAuthorizedView;
