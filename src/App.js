import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import { UserProvider } from "./contexts/User";
import PrivateRoute, { PrivateTemp } from "./components/PrivateRoute/";
import Register from "./views/Register/";
import Login from "./views/Login/";
import Logout from "./views/Logout/";
import PushAdd from "./views/PushAdd/";
import Codes from "./views/Codes/";
import PushComplete from "./views/PushComplete/";
import ChooseAuth from "./views/ChooseAuth/";
import AddCredential from "./views/AddCredential/";
import NotFound from "./views/404/";
import Footer from "./components/Footer/";

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateTemp exact path="/authenticate">
            <ChooseAuth />
          </PrivateTemp>
          <Route path="/authenticate/complete">
            <PushComplete />
          </Route>
          <Route exact path="/authenticate/grant">
            <PushAdd />
          </Route>
          <PrivateTemp path="/code/generate/:auth(push|add)">
            <Codes locked />
          </PrivateTemp>
          <PrivateRoute path="/code/allow">
            <Codes />
          </PrivateRoute>
          <PrivateRoute exact path="/credentials">
            <AddCredential />
          </PrivateRoute>
          <PrivateRoute exact path="/credentials/add">
            <AddCredential />
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <Logout />
          </PrivateRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
