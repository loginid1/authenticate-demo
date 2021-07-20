import React from "react";
import style from "./style.module.css";

import { getDay } from "../../utils/date";

import Button from "../../components/Button/";
import { ReactComponent as DownArrow } from "../../imgs/down-arrow.svg";
import { ReactComponent as Calender } from "../../imgs/calender.svg";

const Option = function ({ subject, title, extra, children }) {
  return (
    <div className={style.info}>
      <div>
        {subject && <div className={style.subject}>{subject}</div>}
        {title && <div className={style.title}>{title}</div>}
        {extra && <div className={style.extra}>{extra}</div>}
      </div>
      <div className={style.right}>{children}</div>
    </div>
  );
};

const Mobile = function ({ buttonOnClick, txConfirm, amount }) {
  const handleOnClick = () => {
    buttonOnClick();
    txConfirm();
  };

  return (
    <div>
      <div className={style.group}>
        <Option subject="Account:" title="37280*****5562">
          <DownArrow />
        </Option>
        <Option
          subject="Paypee:"
          title="YYZ Financial Cashback Card"
          extra="4563 2100 5567 9860"
        >
          <DownArrow />
        </Option>
        <Option title="Amount:">
          <div className={style.amount}>{amount}</div>
        </Option>
      </div>
      <div className={style.group}>
        <Option subject="How Often:" title="Once">
          <DownArrow />
        </Option>
        <Option subject="Date:" title={getDay()}>
          <Calender />
        </Option>
      </div>
      <div className={style.button}>
        <Button onClick={handleOnClick} text="Make a Payment" />
      </div>
    </div>
  );
};

export default Mobile;
