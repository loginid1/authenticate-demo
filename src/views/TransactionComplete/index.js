import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";

import { getDay } from "../../utils/date";

import Header from "../../components/Header/";
import { BoldRow } from "../../components/Row/";
import Button, { SmallButton } from "../../components/Button/";
import { ReactComponent as CheckMark } from "../../imgs/checkmark1.svg";
import PayloadModal from "../../components/PayloadModal/";

import { useUserState } from "../../contexts/User";
import { useTxState } from "../../contexts/Transaction";

const TransactionComplete = function () {
  const [modalOn, setModalOn] = useState(false);
  const history = useHistory();
  const { user } = useUserState();
  const { txState: transactions, txDetails } = useTxState();

  const modalHandler = () => {
    setModalOn((value) => !value);
  };

  const backToAccount = () => {
    history.replace("/dashboard");
  };

  const paymentDetails = [
    ["Date:", getDay()],
    ["Currency:", "USD"],
    ["Amount:", transactions[0].credit.replace("+", "")],
    ["To:", "YYZ Financial"],
    ["Fee:", "$0.01"],
  ];

  return (
    <div className={style.app}>
      <Header />
      {modalOn && (
        <PayloadModal txDetails={txDetails} buttonOnClick={modalHandler} />
      )}
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
              {paymentDetails.map(([prop, value], index) => {
                return <BoldRow key={index} title={prop} value={value} />;
              })}
            </div>
            <div className={style.buttons}>
              <Button
                secondary
                text="Pay Another Bill"
                onClick={() => history.replace("/balance")}
              />
              <Button
                text="Transaction Payload Details"
                onClick={modalHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionComplete;
