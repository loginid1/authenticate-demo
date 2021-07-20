import React from "react";
import style from "./style.module.css";
import { SmallButton } from "../../components/Button/";

const PayloadModal = function ({ txDetails, buttonOnClick }) {
  const { header, payload } = txDetails;

  return (
    <div>
      <div className={style.modal}>
        <pre>
          <code>{`Header:\n\n ${JSON.stringify(
            header,
            null,
            2
          )} \n\nPayload: \n\n ${JSON.stringify(payload, null, 2)}`}</code>
        </pre>
        <SmallButton text="Close" onClick={buttonOnClick} />
      </div>
      <div className={style.backdrop}></div>
    </div>
  );
};

export default PayloadModal;
