import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }) {
  React.useEffect(() => {
    if (!props.isLoggedIn) {
      props.openSigninPopup();
    }
  }, [props.isLoggedIn]);

  return (
    <Route>
      {localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect to='/' />
      )}
      {/* {<Component {...props} />} */}
    </Route>
  );
}

export default ProtectedRoute;
