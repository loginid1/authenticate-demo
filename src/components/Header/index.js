import React from "react";
import style from "./style.module.css";

import VisitInfo from "../VisitInfo/";
import { ReactComponent as Logo } from "../../imgs/logo.svg";
import { SmallButton } from "../Button/";

const Header = function () {
  return (
    <div className={style.header}>
      <div className={style.firstWrapper}>
        <VisitInfo colored />
      </div>
      <Logo className={style.logo} />
      <SmallButton text="Logout" />
    </div>
  );
};

export default Header;
