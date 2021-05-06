import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";
import loginStyle from "../Login/style.module.css";
import registerStyle from "../Register/style.module.css";

import AuthForm from "../../components/AuthForm/";
import Loader from "../../components/Loader/";
import Shortcodes from "../../components/Shortcode/";
import { ReactComponent as Dots } from "../../imgs/ribbed_dots_gray.svg";
import Button from "../../components/Button/";
import { useBody } from "../../hooks/body";
import { useUserState } from "../../contexts/User";
import {
  generateCode,
  allowCode,
  waitForAuthentication,
} from "../../services/loginid";

const messageRequest = "A verification code has been generated.";
const messageGrant = "Enter PIN to verify your new device.";

const Codes = function ({ locked }) {
  const [codes, setCodes] = useState(["-", "-", "-", "-", "-", "-"]);
  const [loading, setLoading] = useState(false);
  const { tempUser, user } = useUserState();
  const history = useHistory();
  useBody();

  const handleInput = (index) => (event) => {
    let number = event.currentTarget.value;
    if (locked || isNaN(Number(number))) return;

    const codesCp = [...codes];
    const nextSibling = event.currentTarget.nextSibling;

    if (number.length > 1) {
      number = number[1];
    }

    codesCp[index] = number;

    if (nextSibling && number) {
      nextSibling.focus();
    }
    setCodes(codesCp);
  };

  const handleGetCodes = useCallback(async () => {
    try {
      const { code } = await generateCode(tempUser);
      setCodes(String(code).split(""));
      const result = await waitForAuthentication(tempUser.username, code);
    } catch (e) {
      console.log(e);
    }
  }, [tempUser]);

  const handleAllowCode = async () => {
    const isValid = codes.every((code) => code && !isNaN(Number(code)));
    if (!isValid) return;

    try {
      const code = codes.join("");
      setLoading(true);
      const { is_authorized } = await allowCode(user, code);
      if (is_authorized) {
        //go to page
        return history.replace("/authenticate/complete/push");
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (locked) {
      handleGetCodes();
    }
  }, [handleGetCodes, locked]);

  return (
    <div className={`${registerStyle.app} ${loginStyle.app}`}>
      <AuthForm className={style.form}>
        <div className={style.info}>
          <div>
            <span className={registerStyle.blue}>
              {locked ? messageRequest : messageGrant}
            </span>
          </div>
        </div>
        <Shortcodes codes={codes} handleInput={handleInput} />
        {!locked && <Button text="Enter PIN" onClick={handleAllowCode} />}
        {locked && (
          <div className={style.resend}>
            Didn't enter the verification code in time?{" "}
            <span className={style.link} onClick={handleGetCodes}>
              Regenerate another one.
            </span>
          </div>
        )}
      </AuthForm>
      {loading && <Loader loading={loading} />}
      <Dots className={registerStyle["dots-left"]} />
      <Dots className={registerStyle["dots-right"]} />
    </div>
  );
};

export default Codes;
