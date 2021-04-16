import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";

import Footer from "../../components/Footer/";
import AuthForm from "../../components/AuthForm/";
import ViewInfo from "../../components/VisitInfo/";
import Input from "../../components/Input/";
import Button from "../../components/Button/";
import { ReactComponent as Dots } from "../../imgs/ribbed_dots.svg";
import { useDirectweb } from "../../hooks/directweb";

const Register = function () {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const dw = useDirectweb();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleRegister = async () => {
    try {
      await dw.register(email);
      history.replace("/dashboard");
    } catch (e) {
      //handle error here
      console.log(e);
      alert(e.message);
    }
  };

  return (
    <div className={style.app}>
      <AuthForm>
        <div className={style.info}>
          <div>
            Welcome!{" "}
            <span className={style.blue}>Let's create an account.</span>
          </div>
        </div>
        <Input placeholder="Email Address" onChange={handleEmail} />
        <Button text="Create Account" onClick={handleRegister} />
      </AuthForm>
      <ViewInfo />
      <Footer />
      <Dots className={style["dots-left"]} />
      <Dots className={style["dots-right"]} />
    </div>
  );
};

export default Register;
