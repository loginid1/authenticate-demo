import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";
import registerStyle from "../Register/style.module.css";

import Footer from "../../components/Footer/";
import AuthForm from "../../components/AuthForm/";
import ViewInfo from "../../components/VisitInfo/";
import Input from "../../components/Input/";
import Button from "../../components/Button/";
import Modal from "../../components/Modal";
import { ReactComponent as Dots } from "../../imgs/ribbed_dots_gray.svg";
import { useDirectweb } from "../../hooks/directweb";
import { useBody } from "../../hooks/body";

const Login = function () {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [isFido2Supported, dw] = useDirectweb();
  useBody();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleLogin = async () => {
    try {
      await dw.login(email);
      history.replace("/dashboard");
    } catch (e) {
      //modal maybe
      console.log(e);
      alert(e.message);
    }
  };

  return (
    <div className={`${registerStyle.app} ${style.app}`}>
      <AuthForm>
        <div className={registerStyle.info}>
          <div>
            Hello again!&nbsp;
            <span className={registerStyle.blue}>Let's login securely.</span>
          </div>
        </div>
        <Input placeholder="Email Address" onChange={handleEmail} />
        <Button text="Login" onClick={handleLogin} />
      </AuthForm>
      <ViewInfo colored />
      <Footer />
      {!isFido2Supported && <Modal />}
      <Dots className={registerStyle["dots-left"]} />
      <Dots className={registerStyle["dots-right"]} />
    </div>
  );
};

export default Login;
