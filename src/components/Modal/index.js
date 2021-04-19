import React from "react";
import style from "./style.module.css";

import { ReactComponent as Lock } from "../../imgs/lock.svg";
import fido2 from "../../imgs/fido2.svg";
import Button from "../Button/";

const Modal = function () {
  return (
    <div className={style.backdrop}>
      <div className={style.modal}>
        <div className={style.header}>
          <div className={style.inner}>
            <Lock className={style.lock} />
            <img
              src={fido2}
              className={style.fido2}
              alt="Fido2 Seal of Approval"
            />
          </div>
        </div>
        <div className={style.body}>
          <b>Your device does not support FIDO2 authentication</b>
          <Button text="List of Fido2 compatible devices" />
          <p>
            To learn more about Fido{" "}
            <a
              className={style.link}
              href="https://loginid.io/learn-more-about-fido"
              target="_blank"
              rel="noreferrer"
            >
              Click Here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
