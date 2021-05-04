import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useUserState } from "../../contexts/User";

const PrivateRoute = function ({ path, children }) {
  const { userExists } = useUserState();
  return !userExists() ? (
    <Redirect to="/register" />
  ) : (
    <Route path={path}>{children}</Route>
  );
};

export const PrivateTemp = function ({ path, children }) {
  const { tempUser } = useUserState();
  return tempUser ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to="/authenticate" />
  );
};

export default PrivateRoute;
