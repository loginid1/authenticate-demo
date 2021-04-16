import React from "react";
import style from "./style.module.css";

import { ReactComponent as FingerPrint } from "../../imgs/fingerprint.svg";
import { ReactComponent as FingerPrintColored } from "../../imgs/fingerprint_colored.svg";

const Visit = function ({ colored = false }) {
  return (
    <div className={style.info}>
      {colored && <FingerPrintColored />}
      {!colored && <FingerPrint />}
      <div className={`${style.message} ${colored ? style.colored : ""}`}>
        Visit:
        <a
          className={`${style.link} ${colored ? style.colored : ""}`}
          href="https://loginid.io/"
          rel="noreferrer"
          target="_blank"
        >
          &nbsp;www.loginid.io
        </a>
      </div>
    </div>
  );
};

export default Visit;
