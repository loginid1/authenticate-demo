import React from "react";
import { useHistory } from "react-router-dom";
import registerStyle from "../Register/style.module.css";
import loginStyle from "../Login/style.module.css";
import codeStyle from "../Codes/style.module.css";
import pushStyle from "../PushComplete/style.module.css";
import style from "./style.module.css";

import AuthForm from "../../components/AuthForm/";
import Card from "../../components/Card/";
import { ReactComponent as Clock } from "../../imgs/time.svg";
import { ReactComponent as Infinity } from "../../imgs/infinite.svg";

const Complete = function () {
  const history = useHistory();

  const pushAuthHandle = () => {
    history.replace("/code/generate/push");
  };

  const addAuthHandle = () => {
    history.replace("/code/generate/add");
  };

  return (
    <div className={`${loginStyle.app}`}>
      <AuthForm className={`${codeStyle.form} ${style.form}`}>
        <div className={`${pushStyle.info} ${style.info}`}>
          <div>
            <span className={registerStyle.blue}>
              To keep your account secure, we need to verify this device.
            </span>
          </div>
        </div>
        <div className={style.items}>
          <Card onClick={pushAuthHandle}>
            <Clock />
            <div>
              <div className={style.title}>One Time Use</div>
              <div>One time access to login to your account.</div>
            </div>
          </Card>
          <Card onClick={addAuthHandle}>
            <Infinity />
            <div>
              <div className={style.title}>Permanent Use</div>
              <div>Use this device to login to your account permanently.</div>
            </div>
          </Card>
        </div>
      </AuthForm>
    </div>
  );
};

export default Complete;
