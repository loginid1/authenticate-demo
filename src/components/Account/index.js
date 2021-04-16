import React from "react";
import style from "./style.module.css";

import creditCard from "../../imgs/credit_card.svg";

const Account = function ({
  type,
  name,
  balance,
  number,
  isCreditCard = false,
}) {
  return (
    <div className={style.account}>
      <b className={style.type}>{type}</b>
      <div className={style.card}>
        <div className={style.inner}>
          <b className={style.name}>{name}</b>
          <b className={style.balance}>{balance}</b>
        </div>
        <b className={style.number}>{number}</b>
        {isCreditCard && (
          <img
            src={creditCard}
            alt="Credit Card"
            className={style.creditCard}
          />
        )}
      </div>
    </div>
  );
};

export default Account;
