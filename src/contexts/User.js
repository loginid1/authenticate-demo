import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const useUserState = function () {
  const context = useContext(UserContext);
  return context;
};

export const UserProvider = function ({ children }) {
  const [user, setUser] = useState(null);
  const [tempUser, setTempUser] = useState(null);

  const loginUser = (user) => {
    setUser(user);
  };
  const logoutUser = () => {
    setUser(null);
  };
  const registerUser = (user) => {
    localStorage.setItem("username", JSON.stringify(user.username));
    setUser(user);
  };
  const getLastUser = () => {
    return JSON.parse(localStorage.getItem("username")) || "";
  };

  const fns = {
    registerUser,
    loginUser,
    logoutUser,
    getLastUser,
    user,
    tempUser,
    setTempUser,
  };

  return <UserContext.Provider value={fns}>{children}</UserContext.Provider>;
};
