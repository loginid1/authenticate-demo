import React from "react";
import style from "./style.module.css";

import Footer from "../../components/Footer/";
import AuthForm from "../../components/AuthForm/";
import ViewInfo from "../../components/VisitInfo/";
import Input from "../../components/Input/";
import Button from "../../components/Button/";
import { ReactComponent as Dots } from "../../imgs/ribbed_dots.svg";

const Home = function () {
  return (
    <div className={style.app}>
      <AuthForm>
        <div className={style.info}>
          <div>
            Welcome!{" "}
            <span className={style.blue}>Let's create an account.</span>
          </div>
        </div>
        <Input placeholder="Email Address" />
        <Button text="Create Account" />
      </AuthForm>
      <ViewInfo />
      <Footer />
      <Dots className={style["dots-left"]} />
      <Dots className={style["dots-right"]} />
    </div>
  );
};

export default Home;
