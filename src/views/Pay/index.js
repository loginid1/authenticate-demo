import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";

import { useMaxWidth } from "../../hooks/width";

import Mobile from "./mobile";
import Desktop from "./desktop";
import TransactionModal from "../../components/TransactionModal/";
import Header from "../../components/Header/";
import Title from "../../components/Title/";

const Pay = function () {
  const history = useHistory();
  const maxWidth = useMaxWidth(768);

  const [txModal, setTxModal] = useState(false);

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

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div>
          <Title onClick={backToAccount} buttonText="Back to Accounts">Pay Bills</Title>
        </div>
        {maxWidth ? <Desktop submitOnClick={onFormSubmit} /> : <Mobile buttonOnClick={showTxModal} />}
      </div>
        {txModal && <TransactionModal />}
    </div>
  );
};

export default Pay;
