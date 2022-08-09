import React, { useContext } from "react";
import { MoviesProvider } from "../MoviesContext";
import { UserContext } from "../UserContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./home";
import Movie from "./movie";
import Register from "./registration";
import Login from "./login";
//import Logout from "./Logout";

function Main() {
  //const [token] = useContext(UserContext);

  return (
    <Router>
      <MoviesProvider>
        <Switch>
          <Route path="/Home" component={Home} />
          <Route path="/Movie" component={Movie} />
          <Route path="/Register" component={Register} />
          <Route exact path="/" component={Login} />
        </Switch>
      </MoviesProvider>
    </Router>
  );
}

export default Main;
