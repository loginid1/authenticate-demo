import React, {useState} from "react";
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
import { base64ToBuffer, bufferToBase64 } from "../../utils/crypto";
import {
  txInit,
  txComplete,
} from "../../services/loginid";

const Pay = function () {
  const history = useHistory();
  const maxWidth = useMaxWidth(768);
  const { user } = useUserState();

  const [txModal, setTxModal] = useState(false);
  const [amount, setAmount] = useState("$937.00");


  const backToAccount = () => {
    history.replace('/dashboard');
  }; 

  const showTxModal = () => {
    setTxModal(true);
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    setTxModal(true);
  }

  const handleAmount = (event) => {
    setAmount(event.currentTarget.value);
  }

  const txConfirmationHandler = async () => {
    try {
      const username = user.username;
      const tx_payload = amount;
      const apiKey = process.env.REACT_APP_API_KEY;

      const init = await txInit(username, tx_payload),
      o = init.assertion_options,
      txid = init.tx_id,
      { challenge: c } = o;
      if (
        ((o.challenge = base64ToBuffer(o.challenge)),
          o.allowCredentials)
      )
        for (const e of o.allowCredentials)
          e.id = base64ToBuffer(e.id);
      const s = await navigator.credentials.get({publicKey: o}),
        d = s.response;
      const completePayload = {
        username: username,
        tx_id: txid,
        client_id: apiKey,
        challenge: c,
        key_handle: bufferToBase64(s.rawId),
        client_data: bufferToBase64(d.clientDataJSON),
        auth_data: bufferToBase64(d.authenticatorData),
        sign_data: bufferToBase64(d.signature),
      };

      const complete = await txComplete(completePayload);
      console.log(complete);
    } catch (e) {
      console.log(e);
    }
    setTxModal(false);
  }

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div>
          <Title onClick={backToAccount} buttonText="Back to Accounts">Pay Bills</Title>
        </div>
        {maxWidth ? <Desktop 
                      submitOnClick={onFormSubmit} 
                      txConfirm={txConfirmationHandler} 
                      handleAmount={handleAmount} 
                      amount={amount}
                      /> 
                  : <Mobile 
                      buttonOnClick={showTxModal} 
                      txConfirm={txConfirmationHandler} 
                      amount={amount}
                      />}
      </div>
        {txModal && <TransactionModal amount={amount} />}
        {txModal && <Loader loading={txModal} />}
    </div>
  );
};

export default Pay;
