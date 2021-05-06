import React from "react";
import { useHistory } from "react-router-dom";
import registerStyle from "../Register/style.module.css";
import loginStyle from "../Login/style.module.css";
import style from "./style.module.css";

import AuthForm from "../../components/AuthForm/";
import Button from "../../components/Button/";
import VisitInfo from "../../components/VisitInfo/";
import { ReactComponent as Warning } from "../../imgs/warning.svg";
import { ReactComponent as Dots } from "../../imgs/ribbed_dots_gray.svg";
import { useBody } from "../../hooks/body";

const NotFound = function () {
  const history = useHistory();
  useBody();

  const handleClick = () => {
    history.replace("/login");
  };

  return (
    <div className={`${registerStyle.app} ${loginStyle.app}`}>
      <AuthForm>
        <div className={style.center}>
          <div className={style.redCircle}>
            <Warning />
          </div>
          <div className={style.info}>
            <div className={style.title}>404</div>
            <div className={style.message}>
              Sorry the page you are looking for cannot be found.
            </div>
          </div>
        </div>
        <Button text="Return to the Homepage" onClick={handleClick} />
      </AuthForm>
      <VisitInfo colored />
      <Dots className={registerStyle["dots-left"]} />
      <Dots className={registerStyle["dots-right"]} />
    </div>
  );
};

export default NotFound;
