import React from "react";
import { useHistory } from "react-router-dom";
import registerStyle from "../Register/style.module.css";
import loginStyle from "../Login/style.module.css";
import codeStyle from "../Codes/style.module.css";
import style from "./style.module.css";

import AuthForm from "../../components/AuthForm/";
import Button from "../../components/Button/";
import { ReactComponent as Circle } from "../../imgs/circle_green.svg";
import { ReactComponent as Checkmark } from "../../imgs/checkmark.svg";
import { ReactComponent as Dots } from "../../imgs/ribbed_dots_gray.svg";
import { useBody } from "../../hooks/body";
import { useUserState } from "../../contexts/User";

const Complete = function () {
  useBody();
  const history = useHistory();
  const { logoutUser } = useUserState();

  const handleComplete = () => {
    logoutUser();
    history.replace("/login");
  };

  return (
    <div className={`${registerStyle.app} ${loginStyle.app}`}>
      <AuthForm className={codeStyle.form}>
        <div className={style.circle}>
          <Circle />
          <Checkmark className={style.checkmark} />
        </div>
        <div className={style.info}>
          <div>
            <span className={registerStyle.blue}>
              Your new device has been authenticated.
            </span>
          </div>
        </div>
        <Button text="Return to Homepage" onClick={handleComplete} />
      </AuthForm>
      <Dots className={registerStyle["dots-left"]} />
      <Dots className={registerStyle["dots-right"]} />
    </div>
  );
};

export default Complete;
