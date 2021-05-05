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
import Footer from "./components/Footer/";

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
          <Route path="/test">
            <ChooseAuth />
          </Route>
          <Route path="/authenticate/complete/push">
            <PushComplete />
          </Route>
          <Route path="/authenticate/:request">
            <PushAdd />
          </Route>
          <Route path="/authenticate/:grant">
            <PushAdd />
          </Route>
          <PrivateTemp path="/code/generate">
            <Codes locked />
          </PrivateTemp>
          <PrivateRoute path="/code/allow">
            <Codes />
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <Logout />
          </PrivateRoute>
          <Route path="/">
            <Register />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
