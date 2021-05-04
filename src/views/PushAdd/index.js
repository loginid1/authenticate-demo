import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import loginStyle from "../Login/style.module.css";
import registerStyle from "../Register/style.module.css";
import style from "./style.module.css";

import Footer from "../../components/Footer/";
import AuthForm from "../../components/AuthForm/";
import ViewInfo from "../../components/VisitInfo/";
import Input from "../../components/Input/";
import { FingerprintButton } from "../../components/Button/";
import Modal from "../../components/Modal";
import { ReactComponent as Dots } from "../../imgs/ribbed_dots_gray.svg";

import { useUserState } from "../../contexts/User";
import { useDirectweb } from "../../hooks/directweb";
import { useBody } from "../../hooks/body";
import loginid from "../../services/loginid";

const Login = function () {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [isFido2Supported] = useDirectweb();
  const { setTempUser } = useUserState();
  useBody();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleLogin = async () => {
    try {
      //might need to refractor
      const { assertion_payload } = await loginid.initAuthenticate(email);
      if (assertion_payload.allowCredentials.length > 0) {
        const { username, id } = await loginid.retrieveUser(email);
        setTempUser({ username, id });
        history.replace("/code/generate");
      } else {
        console.log("No found credentials");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={`${registerStyle.app} ${loginStyle.app}`}>
      <AuthForm>
        <div className={style.info}>
          <div>
            <span className={registerStyle.blue}>Let's login securely.</span>
          </div>
        </div>
        <Input
          placeholder="Email Address"
          onChange={handleEmail}
          className={style.marginTop}
        />
        <FingerprintButton text="Login" onClick={handleLogin} />
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
