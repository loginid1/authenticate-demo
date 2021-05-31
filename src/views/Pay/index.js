import React from "react";
import style from "./style.module.css";

import { useMaxWidth } from "../../hooks/width";

import Mobile from "./mobile";
import Desktop from "./desktop";
import Header from "../../components/Header/";
import Title from "../../components/Title/";

const Pay = function () {
  const maxWidth = useMaxWidth(768);

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div>
          <Title buttonText="Back to Accounts">Pay Bills</Title>
        </div>
        {maxWidth ? <Desktop /> : <Mobile />}
      </div>
    </div>
  );
};

export default Pay;
