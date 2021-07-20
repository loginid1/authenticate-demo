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
import Toast from "../../components/Toast/";

import { useUserState } from "../../contexts/User";
import { useTxState } from "../../contexts/Transaction";
import { delay } from "../../utils/delay";
import { useDelay } from "../../hooks/delay";
import { base64ToBuffer, bufferToBase64 } from "../../utils/crypto";
import { txInit, txComplete } from "../../services/loginid";

const Pay = function () {
  const history = useHistory();
  const maxWidth = useMaxWidth(768);
  const { user } = useUserState();
  const { addPayment, getCurrentBalance, setJWT } = useTxState();

  const [txModal, setTxModal] = useState(false);
  const [amount, setAmount] = useState("$10.00");
  const [isComplete, setComplete] = useState(false);
  const [error, setError] = useDelay("");

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
      ) {
        for (const idCred of options.allowCredentials) {
          idCred.id = base64ToBuffer(idCred.id);
        }
      }
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

      const { jwt } = await txComplete(completePayload);

      setJWT(jwt);
      setComplete(true);
      addPayment(amount);
      await delay();
      setTxModal(false);
      history.replace("/transactionComplete");
    } catch (e) {
      setError(e.message);
      setTxModal(false);
    }
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
            currentBalance={getCurrentBalance()}
            isComplete={isComplete}
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
      {error && <Toast message={error} />}
    </div>
  );
};

export default Pay;
