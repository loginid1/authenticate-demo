import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import style from "./style.module.css";
import registerStyle from "../Register/style.module.css";

import AuthForm from "../../components/AuthForm/";
import ViewInfo from "../../components/VisitInfo/";
import Input from "../../components/Input/";
import { FingerprintButton } from "../../components/Button/";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader/";
import Toast from "../../components/Toast/";
import { ReactComponent as Dots } from "../../imgs/ribbed_dots_gray.svg";
import { useUserState } from "../../contexts/User";
import { useDirectweb } from "../../hooks/directweb";
import { useBody } from "../../hooks/body";
import { useDelay } from "../../hooks/delay";

const Login = function () {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useDelay("");
  const history = useHistory();
  const [isFido2Supported, dw] = useDirectweb();
  const { loginUser } = useUserState();
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
      //modal maybe
      console.log(e);
      setLoading(false);
      setError(e.message);
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
        <FingerprintButton text="Login" onClick={handleLogin} />
        <p className={registerStyle.member}>
          Not a Member?{" "}
          <Link to="/register" className={registerStyle.link}>
            Register
          </Link>
        </p>
      </AuthForm>
      <ViewInfo colored />
      {!isFido2Supported && <Modal />}
      {error && <Toast message={error} />}
      {loading && <Loader loading={loading} />}
      <Dots className={registerStyle["dots-left"]} />
      <Dots className={registerStyle["dots-right"]} />
    </div>
  );
};

export default Login;
