import React from "react";
import style from "./style.module.css";

const Number = function ({ number, onChange }) {
  return <input className={style.number} onChange={onChange} value={number} />;
};

//locked would imply that shortcode is going to be generated
const Shortcodes = function ({ codes, handleInput }) {
  return (
    <div className={style.shortcodes}>
      {codes.map((_, index) => {
        return (
          <Number
            number={codes[index]}
            onChange={handleInput(index)}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default Shortcodes;
