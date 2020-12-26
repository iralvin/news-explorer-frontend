import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }) {
  console.log('props.loggedin', props.isLoggedIn);

  React.useEffect(() => {
    if (!props.isLoggedIn) {
      props.openSigninPopup();
    }
  }, [props.isLoggedIn]);
  
  return (
    <>
      <Route>
        {props.isLoggedIn ? <Component {...props} /> : <Redirect to='/' />}
      </Route>
    </>
  );
}

export default ProtectedRoute;
