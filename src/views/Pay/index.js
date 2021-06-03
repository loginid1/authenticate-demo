import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";

import { useMaxWidth } from "../../hooks/width";

import Mobile from "./mobile";
import Desktop from "./desktop";
import TransactionModal from "../../components/TransactionModal/";
import Header from "../../components/Header/";
import Title from "../../components/Title/";
import Loader from "../../components/Loader/";

import { useUserState } from "../../contexts/User";
import { useTxState } from "../../contexts/Transaction";
import { delay } from "../../utils/delay";
import { base64ToBuffer, bufferToBase64 } from "../../utils/crypto";
import { txInit, txComplete } from "../../services/loginid";

const Pay = function () {
  const history = useHistory();
  const maxWidth = useMaxWidth(768);
  const { user } = useUserState();
  const { txState: transactions, addPayment } = useTxState();

  const [txModal, setTxModal] = useState(false);
  const [amount, setAmount] = useState(transactions[0].balance);
  const [isComplete, setComplete] = useState(false);

  const backToAccount = () => {
    history.replace("/dashboard");
  };

  const showTxModal = () => {
    setTxModal(true);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    setTxModal(true);
  };

  const handleAmount = (event) => {
    setAmount(event.currentTarget.value);
  };

  const txConfirmationHandler = async () => {
    try {
      const username = user.username;
      const tx_payload = amount;
      const apiKey = process.env.REACT_APP_API_KEY;

      const init = await txInit(username, tx_payload),
        options = init.assertion_options,
        txid = init.tx_id,
        { challenge } = options;
      if (
        ((options.challenge = base64ToBuffer(options.challenge)),
        options.allowCredentials)
      )
        for (const idCred of options.allowCredentials)
          idCred.id = base64ToBuffer(idCred.id);
      const cred = await navigator.credentials.get({ publicKey: options }),
        credData = cred.response;
      const completePayload = {
        username: username,
        tx_id: txid,
        client_id: apiKey,
        challenge: challenge,
        key_handle: bufferToBase64(cred.rawId),
        client_data: bufferToBase64(credData.clientDataJSON),
        auth_data: bufferToBase64(credData.authenticatorData),
        sign_data: bufferToBase64(credData.signature),
      };

      await txComplete(completePayload);
      setComplete(true);
      addPayment(amount);
      await delay();
      history.replace("/transactionComplete");
    } catch (e) {
      console.log(e);
    }
    setTxModal(false);
  };

  return (
    <div className={style.app}>
      <Header />
      <div className={style.wrapper}>
        <div>
          <Title onClick={backToAccount} buttonText="Back to Accounts">
            Pay Bills
          </Title>
        </div>
        {maxWidth ? (
          <Desktop
            submitOnClick={onFormSubmit}
            txConfirm={txConfirmationHandler}
            handleAmount={handleAmount}
            amount={amount}
          />
        ) : (
          <Mobile
            buttonOnClick={showTxModal}
            txConfirm={txConfirmationHandler}
            amount={amount}
          />
        )}
      </div>
      {txModal && <TransactionModal amount={amount} isComplete={isComplete} />}
      {txModal && <Loader loading={txModal} />}
    </div>
  );
};

export default Pay;
