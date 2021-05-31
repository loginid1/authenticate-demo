import React from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";

import Header from "../../components/Header/";
import Title from "../../components/Title/";
import Footer from "../../components/Footer/";
import Account from "../../components/Account/";
import Button from "../../components/Button/";
import { useUserState } from "../../contexts/User";
import { useBody } from "../../hooks/body";

const Dashboard = function () {
  const history = useHistory();
  const { logoutUser } = useUserState();
  useBody(false);

  const handleLogout = () => {
    //change this to directory
    logoutUser();
    history.replace("/login");
  };

  const toBalance = () => {
    history.replace("/balance");
  };

  return (
    <div className={style.app}>
      <Header />
      <Title>My Accounts</Title>
      <div className={style.accounts}>
        <Account
          type="Banking"
          name="Personal Chequing"
          balance="$6,575.39"
          number="456321"
          onClick={toBalance}
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

export default Dashboard;
