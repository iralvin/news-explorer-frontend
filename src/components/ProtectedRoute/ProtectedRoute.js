import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }) {
  React.useEffect(() => {
    if (!localStorage.getItem('token')) {
      props.openSigninPopup();
    }
  }, [localStorage.getItem('token')]);

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
