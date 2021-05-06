import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import loginStyle from "../Login/style.module.css";
import registerStyle from "../Register/style.module.css";
import style from "./style.module.css";

import Footer from "../../components/Footer/";
import AuthForm from "../../components/AuthForm/";
import ViewInfo from "../../components/VisitInfo/";
import Input from "../../components/Input/";
import { FingerprintButton } from "../../components/Button/";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader/";
import { ReactComponent as Dots } from "../../imgs/ribbed_dots_gray.svg";

import { useUserState } from "../../contexts/User";
import { useDirectweb } from "../../hooks/directweb";
import { useBody } from "../../hooks/body";
import loginid from "../../services/loginid";

const messageRequest = "Let's login securely.";
const messageGrant = "Login to verify your new device.";

const Login = function () {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const params = useParams();
  const [isFido2Supported, dw] = useDirectweb();
  const { setTempUser, loginUser } = useUserState();
  useBody();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleLogin = async () => {
    try {
      //might need to refractor
      setLoading(true);
      const { assertion_payload } = await loginid.initAuthenticate(email);
      if (assertion_payload.allowCredentials.length === 0) {
        console.log("not allowed");
        setLoading(false);
        return;
      }

      if (params.request === "request") {
        const { username, id } = await loginid.retrieveUser(email);
        setTempUser({ username, id, access: "generate" });
        history.replace("/code/generate");
      } else if (params.request === "grant") {
        const { user, username } = await dw.login(email);
        loginUser({ ...user, username });
        history.replace("/code/allow");
      } else {
        setLoading(false);
        throw new Error("Authentication not allowed");
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <div className={`${registerStyle.app} ${loginStyle.app}`}>
      <AuthForm>
        <div className={style.info}>
          <div>
            <span className={registerStyle.blue}>
              {params.request === "request" ? messageRequest : messageGrant}
            </span>
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
      <Loader loading={loading} />
    </div>
  );
};

export default Login;
