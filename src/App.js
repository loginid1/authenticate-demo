import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import { UserProvider } from "./contexts/User";
import PrivateRoute, { PrivateTemp } from "./components/PrivateRoute/";
import Register from "./views/Register/";
import Login from "./views/Login/";
import Logout from "./views/Logout/";
import PushAdd from "./views/PushAdd/";
import Codes from "./views/Codes/";

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/authenticate">
            <PushAdd />
          </Route>
          <PrivateTemp path="/code/generate">
            <Codes locked />
          </PrivateTemp>
          <PrivateRoute path="/dashboard">
            <Logout />
          </PrivateRoute>
          <Route path="/">
            <Register />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
