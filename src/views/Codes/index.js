import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import style from "./style.module.css";
import loginStyle from "../Login/style.module.css";
import registerStyle from "../Register/style.module.css";

import AuthForm from "../../components/AuthForm/";
import Loader from "../../components/Loader/";
import Toast from "../../components/Toast/";
import Shortcodes from "../../components/Shortcode/";
import { ReactComponent as Dots } from "../../imgs/ribbed_dots_gray.svg";
import Button from "../../components/Button/";
import { useBody } from "../../hooks/body";
import { useUserState } from "../../contexts/User";
import { useDelay } from "../../hooks/delay";
import {
  PURPOSE,
  retrieveUser,
  generateCode,
  allowCode,
  waitForAuthentication,
} from "../../services/loginid";

const messageRequest = "A verification code has been generated.";
const messageGrant = "Enter PIN to verify your new device.";

const Codes = function ({ locked }) {
  const [codes, setCodes] = useState(["-", "-", "-", "-", "-", "-"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useDelay("");
  const { tempUser, user, loginUser } = useUserState();
  const history = useHistory();
  const params = useParams();
  useBody();

  const handleInput = (index) => (event) => {
    let number = event.currentTarget.value;
    if (locked || isNaN(Number(number))) return;

    let codesCp = [...codes];
    const nextSibling = event.currentTarget.nextSibling;

    if (number.length > 1) {
      number = number[1];
    }

    codesCp[index] = number;
    //Makes sure there are no string code boxes
    codesCp = codesCp.map((val) => (val === " " || val === "" ? "-" : val));

    if (nextSibling && number) {
      if (codesCp[index + 1] === "-") {
        codesCp[index + 1] = " ";
      }
      nextSibling.focus();
    }

    setCodes(codesCp);
  };

  const handleGetCodes = useCallback(async () => {
    try {
      const type = params.auth;
      // get user info
      const user = await retrieveUser(tempUser.username);
      //determine if push or add auth
      const { code } = await generateCode(user, PURPOSE.push);
      let addCode;
      setCodes(String(code).split(""));

      if (type === "add") {
        addCode = (await generateCode(user, PURPOSE.add)).code;
      }

      //wait for code to be allowed on other device
      const { is_authenticated } = await waitForAuthentication(
        user.username,
        code
      );

      if (is_authenticated) {
        if (type === "add") {
          const { is_authorized } = await allowCode(user, addCode, PURPOSE.add);

          if (is_authorized) {
            loginUser({ ...user, addAuth: { code: addCode, type: "short" } });
            return history.replace("/credentials/add");
          }
        }

        loginUser(user);
        history.replace("/dashboard");
      }
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAllowCode = async () => {
    const isValid = codes.every((code) => code && !isNaN(Number(code)));
    if (!isValid) return;

    try {
      setLoading(true);

      const code = codes.join("");
      const data = await allowCode(user, code, PURPOSE.push);
      const { is_authorized } = data;

      if (is_authorized) {
        return history.replace("/authenticate/complete");
      }

      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e.message);
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
      {error && <Toast message={error} />}
      <Dots className={registerStyle["dots-left"]} />
      <Dots className={registerStyle["dots-right"]} />
    </div>
  );
};

export default Codes;
