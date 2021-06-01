import React from "react";
import style from "./style.module.css";

import Header from "../../components/Header/";
import { ReactComponent as CheckMark } from "../../imgs/checkmark1.svg";

const TransactionComplete = function () {
  return (
    <div className={style.wrapper}>
      <Header />
      <div className={style.complete}>
        <div className={style.checkmark}>
          <CheckMark />
        </div>
        <div>Transaction Approved</div>
      </div>
      <div className={style.note}>
        Thank you, your payment has been received. A confirmation email has been
        sent to username.
      </div>
    </div>
  );
};

export default TransactionComplete;
