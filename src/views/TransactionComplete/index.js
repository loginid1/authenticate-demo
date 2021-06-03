import React from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";

import { currentDay } from "../../utils/date";

import Header from "../../components/Header/";
import { BoldRow } from "../../components/Row/";
import Button, { SmallButton } from "../../components/Button/";
import { ReactComponent as CheckMark } from "../../imgs/checkmark1.svg";

import { useUserState } from "../../contexts/User";
import { useTxState } from "../../contexts/Transaction";

const TransactionComplete = function () {
  const history = useHistory();
  const { user } = useUserState();
  const { txState: transactions } = useTxState();

  const backToAccount = () => {
    history.replace("/dashboard");
  };
  return (
    <div className={style.app}>
      <Header />
      <div className={style.wrapper}>
        <div className={style.backButton}>
          <SmallButton
            secondary
            text="Back to Accounts"
            onClick={backToAccount}
          />
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
              <span className={style.email}>{user.username}.</span>
            </div>
            <div className={style.spacer}>
              <div>Payment Details:</div>
              <hr />
            </div>
            <div className={style.rows}>
              <BoldRow title="Date:" value={currentDay()} />
              <BoldRow title="Transfer:" value="USD" />
              <BoldRow
                title="Amount:"
                value={transactions[0].credit.replace("+", "")}
              />
              <BoldRow title="To:" value="YYZ Financial" />
              <BoldRow title="Fee:" value="$0.01" />
            </div>
            <div className={style.buttons}>
              <Button
                secondary
                text="Pay Another Bill"
                onClick={() => history.replace("/balance")}
              />
              <Button text="View My Accounts" onClick={backToAccount} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionComplete;
