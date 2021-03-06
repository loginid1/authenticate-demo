import { createContext, useContext, useState } from "react";
import { getDay } from "../utils/date";
import { formatter } from "../utils/money";
import { parseJWT } from "../utils/crypto";

const TxContext = createContext(null);

export const useTxState = function () {
  const context = useContext(TxContext);
  return context;
};

const makeTransaction = (date, transactionDescription, credit, balance) => {
  return { date, transactionDescription, credit, balance };
};

const transactions = [
  makeTransaction("May 18, 2021", "PHARMACY #0257", "$26.96", "$937.00"),
  makeTransaction(
    "May 16, 2021",
    "UBR*PENDING.UBER.COM #0257",
    "$29.00",
    "$908.00"
  ),
  makeTransaction("May 16, 2021", "GROCERY STORE #179", "$89.43", "$818.57"),
  makeTransaction("May 12, 2021", "ABC CANADA", "$567.00", "$251.57"),
  makeTransaction("May 08, 2021", "GROCERY STORE #179", "$13.00", "$238.57"),
];

export const TxProvider = function ({ children }) {
  const [txState, setTxState] = useState(transactions);
  const [txDetails, setTxDetails] = useState({});

  const addPayment = (amount) => {
    const paymentCredit = Number(amount.replace("$", ""));
    const newBalance = formatter.format(getCurrentBalance() - paymentCredit);
    setTxState([
      makeTransaction(
        getDay(),
        "PAYMENT - YYZ Financial",
        "+" + formatter.format(paymentCredit),
        newBalance
      ),
      ...txState,
    ]);
  };

  const getCurrentBalance = () => {
    return Number(txState[0].balance.replace("$", "").replaceAll(",", ""));
  };

  const getCurrentBalanceFormatted = () => {
    return formatter.format(getCurrentBalance());
  };

  //used for demo
  const restartBalance = () => {
    setTxState(transactions);
  };

  const setJWT = (token) => {
    setTxDetails(parseJWT(token));
  };

  const fns = {
    txState,
    txDetails,
    setJWT,
    addPayment,
    getCurrentBalance,
    getCurrentBalanceFormatted,
    restartBalance,
  };

  return <TxContext.Provider value={fns}>{children}</TxContext.Provider>;
};
