import React from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";

import Header from "../../components/Header/";
import Title from "../../components/Title/";
import Account from "../../components/Account/";
import Button from "../../components/Button/";
import { useUserState } from "../../contexts/User";
import { useTxState } from "../../contexts/Transaction";

const Dashboard = function () {
  const history = useHistory();
  const { logoutUser } = useUserState();
  const { getCurrentBalanceFormatted, restartBalance } = useTxState();

  const handleLogout = () => {
    restartBalance();
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
        />
        <Account
          type="Credit"
          name="Cashback Credit Card"
          balance={getCurrentBalanceFormatted()}
          number="4563 2100 5567 9860"
          isCreditCard
          onClick={toBalance}
        />
      </div>
      <div className={style.button}>
        <Button text="Logout" onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Dashboard;
