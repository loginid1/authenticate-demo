import React from "react";
import style from "./style.module.css";

import { ReactComponent as Fingerprint } from "../../imgs/fingerprint.svg";

const Button = function ({ text, ...props }) {
  return (
    <button className={style.button} {...props}>
      {text}
    </button>
  );
};

export const SmallButton = function ({ text, ...props }) {
  return (
    <button className={style.smallbutton} {...props}>
      {text}
    </button>
  );
};

export const ButtonImage = function (Image) {
  return function ({ text, ...props }) {
    return (
      <button className={style.imagebutton} {...props}>
        <Image height="16px" width="16px" margin-right="10px" />
        {text}
      </button>
    );
  };
};

export const FingerprintButton = ButtonImage(Fingerprint);

export default Button;
