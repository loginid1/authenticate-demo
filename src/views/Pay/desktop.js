import React from "react";
import style from "./style.module.css";

import { currentDay } from "../../utils/date";

import { SmallButton } from "../../components/Button/";

const Select = function ({ subject, value, calender }) {
  return (
    <div className={style.select}>
      <label className={style.subject}>{subject}</label>
      <div className={calender ? style.calender : style.select}>
        <select>
          <option>{value}</option>
        </select>
      </div>
    </div>
  );
};

const Desktop = function () {
  return (
    <form className={style.form}>
      <fieldset className={style.section1}>
        <div className={style.subject}>Payment To:</div>
        <div>
          <span className={style.title1}>YYZ Financial Cashback Card </span>
          <span className={style.extra1}>- 4563 2100 5567 9860</span>
        </div>
      </fieldset>
      <fieldset className={style.section2}>
        <div className={style.split}>
          <Select subject="Account:" value="37280*****5562"></Select>
          <div className={style.input}>
            <label className={style.subject}>Amount:</label>
            <input type="text" />
          </div>
        </div>
      </fieldset>
      <fieldset className={style.section1}>
        <div className={style.split}>
          <Select subject="Date:" value={currentDay()} calender></Select>
          <Select subject="Frequency:" value="One Time"></Select>
        </div>
        <div className={style.button1}>
          <SmallButton text="Make a Payment" />
        </div>
      </fieldset>
    </form>
  );
};

export default Desktop;
