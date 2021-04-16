import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Register from "./views/Register/";
import Login from "./views/Login/";
import Logout from "./views/Logout/";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
