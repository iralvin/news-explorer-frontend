import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }) {
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
