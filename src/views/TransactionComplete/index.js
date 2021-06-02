import React from "react";
import style from "./style.module.css";

import { currentDay } from "../../utils/date";

import Header from "../../components/Header/";
import { BoldRow } from "../../components/Row/";
import Button, { SmallButton } from "../../components/Button/";
import { ReactComponent as CheckMark } from "../../imgs/checkmark1.svg";

const TransactionComplete = function () {
  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.backButton}>
          <SmallButton secondary text="Back to Accounts" />
        </div>
        <div className={style.inner}>
          <div className={style.complete}>
            <div className={style.checkmark}>
              <CheckMark />
            </div>
            <div>Transaction Approved</div>
          </div>
          <div className={style.info}>
            <div className={style.note}>
              Thank you, your payment has been received.{" "}
              <span className={style.normal}>
                A confirmation email has been sent to
              </span>{" "}
              <span className={style.email}>username.</span>
            </div>
            <div className={style.spacer}>
              <div>Payment Details:</div>
              <hr />
            </div>
            <div className={style.rows}>
              <BoldRow title="Date:" value={currentDay()} />
              <BoldRow title="Transfer:" value="USD" />
              <BoldRow title="Amount:" value="$937.00" />
              <BoldRow title="To:" value="YYZ Financial" />
              <BoldRow title="Fee:" value="$0.01" />
            </div>
            <div className={style.buttons}>
              <Button secondary text="Pay Another Bill" />
              <Button text="View My Accounts" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionComplete;
