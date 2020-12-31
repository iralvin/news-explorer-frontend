import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
  function checkLoggedInState() {
    if (!props.isLoggedIn) {
      props.openSigninPopup();
      return <Redirect to="/" />
    }
    else {
      <Component {...props} />
    }
  }

  React.useEffect(() => {
    console.log(props.isLoggedIn);
    if (!props.isLoggedIn) {
      props.openSigninPopup();
    }
  }, [props.isLoggedIn]);

  return (
    <>
      {/* <Route>
        {props.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />}
      </Route> */}
    {checkLoggedInState}

    </>
  );
}

export default ProtectedRoute;
