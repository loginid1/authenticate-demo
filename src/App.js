import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Home from "./views/Home/";
import Login from "./views/Login/";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
