import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import { UserProvider } from "./contexts/User";
import PrivateRoute, { PrivateTemp } from "./components/PrivateRoute/";
import Register from "./views/Register/";
import Login from "./views/Login/";
import Dashboard from "./views/Dashboard/";
import Balance from "./views/Balance/";
import Pay from "./views/Pay/";
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
            <Pay />
          </Route>
          <Route path="/register">
            <Register />
            <Footer />
          </Route>
          <Route path="/login">
            <Login />
            <Footer />
          </Route>
          <PrivateTemp exact path="/authenticate">
            <ChooseAuth />
            <Footer />
          </PrivateTemp>
          <Route path="/authenticate/complete">
            <PushComplete />
            <Footer />
          </Route>
          <Route exact path="/authenticate/grant">
            <PushAdd />
            <Footer />
          </Route>
          <PrivateTemp path="/code/generate/:auth(push|add)">
            <Codes locked />
            <Footer />
          </PrivateTemp>
          <PrivateRoute path="/code/allow">
            <Codes />
            <Footer />
          </PrivateRoute>
          <PrivateRoute exact path="/credentials">
            <AddCredential />
            <Footer />
          </PrivateRoute>
          <PrivateRoute exact path="/credentials/add">
            <AddCredential addingCredential />
            <Footer />
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <Dashboard />
            <Footer />
          </PrivateRoute>
          <Route path="*">
            <NotFound />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
