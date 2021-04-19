import React from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";

import Header from "../../components/Header/";
import Footer from "../../components/Footer/";
import Account from "../../components/Account/";
import Button from "../../components/Button/";
import { useBody } from "../../hooks/body";

const Logout = function () {
  const history = useHistory();
  useBody(false);

  const handleLogout = () => {
    //change this to directory
    history.replace("/register");
  };

  return (
    <div className={style.app}>
      <Header />
      <h1 className={style.title}>My Accounts</h1>
      <div className={style.accounts}>
        <Account
          type="Banking"
          name="Personal Chequing"
          balance="$6,575.39"
          number="456321"
        />
        <Account
          type="Credit"
          name="Cashback Credit Card"
          balance="$937.00"
          number="4563 2100 5567 9860"
          isCreditCard
        />
      </div>
      <div className={style.button}>
        <Button text="Logout" onClick={handleLogout} />
      </div>
      <Footer />
    </div>
  );
};

export default Logout;
