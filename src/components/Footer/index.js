import React from "react";
import style from "./style.module.css";

const Footer = function () {
  return (
    <footer className={style.footer}>
      <div>Copyright &#169; 2021 LoginID inc. All rights reserved.</div>
      <b>Privacy Policy | Terms of Use</b>
    </footer>
  );
};

export default Footer;
