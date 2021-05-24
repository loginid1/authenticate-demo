import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";
import registerStyle from "../Register/style.module.css";

import AuthForm from "../../components/AuthForm/";
import ViewInfo from "../../components/VisitInfo/";
import Input from "../../components/Input/";
import { WordLink } from "../../components/Link/";
import { FingerprintButton } from "../../components/Button/";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader/";
import Toast, { ToastOption } from "../../components/Toast/";
import { ReactComponent as Dots } from "../../imgs/ribbed_dots_gray.svg";
import { useUserState } from "../../contexts/User";
import { useDirectweb } from "../../hooks/directweb";
import { useBody } from "../../hooks/body";
import { useDelay } from "../../hooks/delay";

const secondDeviceMessage = "Trying to login on a second device?";
const navigatorError = "Your Identity could not be verified";

const Login = function () {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useDelay("");
  const [message, setMessage] = useDelay("", 10000);
  const history = useHistory();
  const [isFido2Supported, dw] = useDirectweb();
  const { loginUser, setTempUser } = useUserState();
  useBody();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { user, username } = await dw.login(email);
      loginUser({ ...user, username });
      history.replace("/dashboard");
    } catch (e) {
      setLoading(false);
      if (e.message === navigatorError) {
        setMessage(secondDeviceMessage);
      } else if (e.message) {
        setError(e.message);
      }
    }
  };

  const handleSecondDevice = () => {
    setTempUser({ username: email });
    history.push("/authenticate");
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
        <FingerprintButton text="Login" onClick={handleLogin} />
        <WordLink info="Not a Member?" link="Register" to="/register" />
        <WordLink
          info="Need to enter a code?"
          link="Click Here"
          to="/authenticate/grant"
        />
      </AuthForm>
      <ViewInfo colored />
      {!isFido2Supported && <Modal />}
      {error && <Toast message={error} />}
      {loading && <Loader loading={loading} />}
      {message && (
        <ToastOption
          message={message}
          option="Click Here"
          onClick={handleSecondDevice}
        />
      )}
      <Dots className={registerStyle["dots-left"]} />
      <Dots className={registerStyle["dots-right"]} />
    </div>
  );
};

export default Login;
