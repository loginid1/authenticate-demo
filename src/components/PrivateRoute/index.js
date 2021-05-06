import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useUserState } from "../../contexts/User";

const PrivateRoute = function ({ path, children }) {
  const { user } = useUserState();
  return !user ? (
    <Redirect to="/login" />
  ) : (
    <Route path={path}>{children}</Route>
  );
};

export const PrivateTemp = function ({ path, children }) {
  const { tempUser } = useUserState();
  return tempUser ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to="/authenticate/request" />
  );
};

export default PrivateRoute;
