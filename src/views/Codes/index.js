import React, { useState, useEffect, useCallback } from "react";
import style from "./style.module.css";
import loginStyle from "../Login/style.module.css";
import registerStyle from "../Register/style.module.css";

import AuthForm from "../../components/AuthForm/";
import Shortcodes from "../../components/Shortcode/";
import { ReactComponent as Dots } from "../../imgs/ribbed_dots_gray.svg";
import ViewInfo from "../../components/VisitInfo/";
import { useBody } from "../../hooks/body";
import { useUserState } from "../../contexts/User";
import { generateCode } from "../../services/loginid";

const Codes = function ({ locked }) {
  const [codes, setCodes] = useState(["-", "-", "-", "-", "-", "-"]);
  const { tempUser } = useUserState();
  useBody();

  const handleInput = (index) => (event) => {
    let number = event.currentTarget.value;
    if (locked || isNaN(Number(number))) return;

    //restrict to one number
    if (number.length > 1) {
      number = number[1];
    }

    const codesCp = [...codes];
    codesCp[index] = number;
    setCodes(codesCp);
  };

  const handleGetcodes = useCallback(async () => {
    try {
      const { code } = await generateCode(tempUser);
      setCodes(String(code).split(""));
    } catch (e) {
      console.log(e);
    }
  }, [tempUser]);

  useEffect(() => {
    handleGetcodes();
  }, [handleGetcodes]);

  return (
    <div className={`${registerStyle.app} ${loginStyle.app}`}>
      <AuthForm className={style.form}>
        <div className={style.info}>
          <div>
            <span className={registerStyle.blue}>
              A verification code has been generated.
            </span>
          </div>
        </div>
        <Shortcodes codes={codes} handleInput={handleInput} />
        <div className={style.resend}>
          Didn't enter the verification code in time?{" "}
          <span className={style.link} onClick={handleGetcodes}>
            Regenerate another one.
          </span>
        </div>
      </AuthForm>
      <ViewInfo colored />
      <Dots className={registerStyle["dots-left"]} />
      <Dots className={registerStyle["dots-right"]} />
    </div>
  );
};

export default Codes;
