import React from "react";
import style from "./style.module.css";
import registerStyle from "../Register/style.module.css";

import Header from "../../components/Header/";
import Title from "../../components/Title/";
import { SmallButton } from "../../components/Button/";
import { ReactComponent as Dots } from "../../imgs/ribbed_dots_gray.svg";
import creditCard from "../../imgs/credit_card.svg";
import { useBody } from "../../hooks/body";
import transactionData from "./data";

const Row = function ({ title, value, secondary }) {
  return (
    <div className={style.row}>
      <p className={secondary ? style.key : ""}>{title}</p>
      <p className={secondary ? style.value : ""}>{value}</p>
    </div>
  );
};

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
  useBody();

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <Title buttonText="Back to Accounts">My Accounts</Title>
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
                <Row title="Current Balance:" value="$937.00" secondary />
                <Row title="Pending Transactions" value="$0.00" />
                <Row title="Current Rewards" value="$26.00" />
                <Row title="Available Credit" value="$9,063.00" />
                <Row title="Credit Limit" value="$10,000.00" />
              </div>
              <SmallButton text="Make a Payment" />
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
              {transactionData.map((data, index) => {
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
