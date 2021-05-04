import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const useUserState = function () {
  const context = useContext(UserContext);
  return context;
};

export const UserProvider = function ({ children }) {
  const [user, setUser] = useState(null);
  const [tempUser, setTempUser] = useState(null);

  const loginUser = (user) => {
    window.localStorage.setItem("currentUser", JSON.stringify(user));
    setUser(user);
  };
  const logoutUser = () => {
    window.localStorage.removeItem("currentUser");
    setUser(null);
  };
  const userExists = () => {
    return !!window.localStorage.getItem("currentUser");
  };

  useEffect(() => {
    const localStorageUser = window.localStorage.getItem("currentUser");
    if (localStorageUser && !user) {
      setUser(JSON.parse(localStorageUser));
    }
  }, [user]);

  const fns = { loginUser, logoutUser, userExists, tempUser, setTempUser };

  return <UserContext.Provider value={fns}>{children}</UserContext.Provider>;
};
