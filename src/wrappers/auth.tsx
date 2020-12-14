import { Redirect } from 'umi'
import React from 'react'
const Auth = (props:any) => {
  if (props) {
    return (<div>{ props.children }</div>);
  } else {
    return <Redirect to="/login" />;
  }
}


export default Auth