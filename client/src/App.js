import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AppContext from "./context/AppContext";

function PublicRoutes() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(routeProps) => <Register {...routeProps} />}
      />
      <Route
        exact
        path="/login"
        render={(routeProps) => <Login {...routeProps} />}
      />
    </Switch>
  );
}

function PrivateRoutes() {
  return (
    <Switch>
      <Route exact path="/" render={(routeProps) => <Home {...routeProps} />} />
    </Switch>
  );
}

function App(props) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(`/verify`)
      .then((res) => res.json())
      .then((res) => {
        if (res?.user) {
          setUser(res?.user);
          props.history.push("/");
        } else {
          const { location } = props;

          if (location?.pathname?.includes("register")) {
            props.history.push("/");
          } else {
            props.history.push("/login");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <div className="min-h-screen">
        {user?._id ? <PrivateRoutes /> : <PublicRoutes />}
      </div>
    </AppContext.Provider>
  );
}

export default withRouter(App);
