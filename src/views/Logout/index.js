import React from "react";
import style from "./style.module.css";

import Header from "../../components/Header/";
import Footer from "../../components/Footer/";
import Account from "../../components/Account/";
import Button from "../../components/Button/";

const Logout = function () {
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
        <Button text="Logout" />
      </div>
      <Footer />
    </div>
  );
};

export default Logout;
