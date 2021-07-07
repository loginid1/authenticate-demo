import React from "react";
import style from "./style.module.css";

import { fullCurrentDay } from "../../utils/date";

import { BoldRow } from "../../components/Row/";
import fingerprint from "../../imgs/fingerprint_colored.svg";
import { ReactComponent as CheckMark } from "../../imgs/checkmark1.svg";

const Transaction = function ({ isComplete, amount }) {
  const message = isComplete ? "Transaction Approved" : "Approve Transaction?";

  return (
    <div className={`${style.modal} ${isComplete ? style.disappear : ""}`}>
      <div className={style.top}>
        <div className={style.title}>
          <img src={fingerprint} alt="Fingerprint" />
          <div>
            <div className={style.td}>Transaction Details</div>
            <div className={style.date}>{fullCurrentDay()}</div>
          </div>
        </div>
        <div className={style.info}>
          <BoldRow title="Currency:" value="USD" />
          <BoldRow title="Amount:" value={amount} />
          <BoldRow title="To:" value="YYZ Financial" />
          <BoldRow title="Fee:" value="$0.01" />
        </div>
      </div>
      <div className={isComplete ? style.bottomSuccess : style.bottom}>
        {isComplete && (
          <div className={style.checkmark}>
            <CheckMark />
          </div>
        )}
        <div className={isComplete ? style.approvalMessage : ""}>{message}</div>
      </div>
    </div>
  );
};

export default Transaction;
