import React from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";
import registerStyle from "../Register/style.module.css";

import Header from "../../components/Header/";
import Title from "../../components/Title/";
import { SmallButton } from "../../components/Button/";
import { ReactComponent as Dots } from "../../imgs/ribbed_dots_gray.svg";
import Row from "../../components/Row/";
import creditCard from "../../imgs/credit_card.svg";
import { useTxState } from "../../contexts/Transaction";
import { formatter } from "../../utils/money";

const TransactionRow = function ({ transaction }) {
  const { date, transactionDescription, credit, balance } = transaction;
  return (
    <tr>
      <td className={style.hidden1}>{date}</td>
      <td>{transactionDescription}</td>
      <td className={style.hidden}>{credit}</td>
      <td>{balance}</td>
    </tr>
  );
};

const Balance = function () {
  const history = useHistory();
  const { txState: transactions, getCurrentBalance } = useTxState();
  const latestTransaction = transactions[0];
  const availableCredit = formatter.format(10000 - getCurrentBalance());

  const backToAccount = () => {
    history.replace("/dashboard");
  };

  const toPayment = () => {
    history.replace("/pay");
  };

  return (
    <div className={style.app}>
      <Header />
      <div className={style.wrapper}>
        <Title buttonText="Back to Accounts" onClick={backToAccount}>
          My Accounts
        </Title>
        <div className={style.body}>
          <div className={style.credit}>
            <img
              src={creditCard}
              alt="Credit Card"
              className={style.creditCard}
            />
            <div className={style.creditInfo}>
              <b>Cashback Credit Card</b>
              <b className={style.creditNumber}>4563 2100 5567 9860</b>
            </div>
          </div>
          <div className={style.totals}>
            <img
              src={creditCard}
              alt="Credit Card"
              className={style.bigCreditCard}
            />
            <div className={style.totalsInner}>
              <div className={style.info}>
                <Row
                  title="Current Balance:"
                  value={latestTransaction.balance}
                  secondary
                />
                <Row title="Pending Transactions" value="$0.00" />
                <Row title="Current Rewards" value="$26.00" />
                <Row title="Available Credit" value={availableCredit} />
                <Row title="Credit Limit" value="$10,000.00" />
              </div>
              <SmallButton onClick={toPayment} text="Make a Payment" />
            </div>
          </div>
          <table className={style.transactions}>
            <tbody>
              <tr className={style.transactionHeader}>
                <th className={style.hidden1}>DATE</th>
                <th>TRANSACTION DESCRIPTION</th>
                <th className={style.hidden}>CREDIT</th>
                <th>BALANCE</th>
              </tr>
              {transactions.map((data, index) => {
                return <TransactionRow key={index} transaction={data} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Dots className={`${registerStyle["dots-left"]} ${style.dots}`} />
      <Dots className={`${registerStyle["dots-right"]} ${style.dots}`} />
    </div>
  );
};

export default Balance;
