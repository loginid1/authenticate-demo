import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import style from "./style.module.css";

import AuthForm from "../../components/AuthForm/";
import ViewInfo from "../../components/VisitInfo/";
import Input from "../../components/Input/";
import { FingerprintButton } from "../../components/Button/";
import Modal from "../../components/Modal/";
import Toast from "../../components/Toast/";
import Loader from "../../components/Loader/";
import { useUserState } from "../../contexts/User";
import { useDirectweb } from "../../hooks/directweb";
import { useDelay } from "../../hooks/delay";

const Register = function () {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useDelay("");
  const history = useHistory();
  const [isFido2Supported, dw] = useDirectweb();
  const { registerUser } = useUserState();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleRegister = async () => {
    try {
      setLoading(true);
      const { user, username } = await dw.register(email);
      registerUser({ ...user, username });
      history.replace("/dashboard");
    } catch (e) {
      //handle error here
      setLoading(false);
      setError(e.message);
      console.log(e);
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
          <Link to="/login" className={style.link}>
            Login
          </Link>
        </p>
      </AuthForm>
      <ViewInfo />
      {!isFido2Supported && <Modal />}
      {error && <Toast message={error} />}
      {loading && <Loader loading={loading} />}
    </div>
  );
};

export default Register;
