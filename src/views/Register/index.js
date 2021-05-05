import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";

import AuthForm from "../../components/AuthForm/";
import ViewInfo from "../../components/VisitInfo/";
import Input from "../../components/Input/";
import { FingerprintButton } from "../../components/Button/";
import Modal from "../../components/Modal/";
import { ReactComponent as Dots } from "../../imgs/ribbed_dots.svg";
import { useUserState } from "../../contexts/User";
import { useDirectweb } from "../../hooks/directweb";
import { useBody } from "../../hooks/body";

const Register = function () {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [isFido2Supported, dw] = useDirectweb();
  const { loginUser } = useUserState();
  useBody();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleRegister = async () => {
    try {
      const { user, username } = await dw.register(email);
      loginUser({ ...user, username });
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
        <FingerprintButton text="Create Account" onClick={handleRegister} />
        <p className={style.member}>
          Already a Member?{" "}
          <a href="/login" className={style.link}>
            Login
          </a>
        </p>
      </AuthForm>
      <ViewInfo />
      {!isFido2Supported && <Modal />}
      <Dots className={style["dots-left"]} />
      <Dots className={style["dots-right"]} />
    </div>
  );
};

export default Register;
