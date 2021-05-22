import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import style from "./style.module.css";
import registerStyle from "../Register/style.module.css";

import Header from "../../components/Header/";
import Toast from "../../components/Toast/";
import { useBody } from "../../hooks/body";
import { ReactComponent as Dots } from "../../imgs/ribbed_dots_gray.svg";
import { CustomCard } from "../../components/Card/";
import OSImage from "../../components/OSImage/";
import { FingerprintButton } from "../../components/Button/";
import Loader from "../../components/Loader/";
import { ReactComponent as GrayCircle } from "../../imgs/circle_gray.svg";
import { ReactComponent as Checkmark } from "../../imgs/checkmark.svg";

import { credentialsInit, credentialsComplete } from "../../services/loginid";
import { useFindPlatform } from "../../hooks/platforms";
import { useUserState } from "../../contexts/User";
import { useDelay } from "../../hooks/delay";
import { base64ToBuffer, bufferToBase64 } from "../../utils/crypto";

const AddCredential = function () {
  useBody();
  const os = useFindPlatform();
  const { user } = useUserState();
  const [error, setError] = useDelay("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const osAndVersion = navigator.appVersion.split(";")[0].split("(")[1];

  const addCredentialHandler = async () => {
    try {
      setLoading(true);
      const { code, type } = user.addAuth;
      const init = await credentialsInit(user, code, type);

      const { attestation_payload: attestationPayload } = init;
      const {
        credential_uuid: credentialUUID,
        ...publicKey
      } = attestationPayload;
      const { challenge } = publicKey;

      publicKey.challenge = base64ToBuffer(publicKey.challenge);
      publicKey.user.id = base64ToBuffer(publicKey.user.id);

      const credential = await navigator.credentials.create({ publicKey });
      const response = credential.response;

      const completePayload = {
        client_id: user.client_id,
        username: user.username,
        attestation_payload: {
          challenge,
          credential_uuid: credentialUUID,
          credential_id: bufferToBase64(credential.rawId),
          client_data: bufferToBase64(response.clientDataJSON),
          attestation_data: bufferToBase64(response.attestationObject),
        },
      };

      await credentialsComplete(completePayload);
      history.replace("/credentials");
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  return (
    <div className={style.main}>
      <Header />
      <div className={style.center}>
        <h1 className={style.title}>Add your new device</h1>
        <CustomCard>
          <div className={style.info}>
            <OSImage os={os} width="50px" height="60px" />
            <p>{osAndVersion}</p>
          </div>
          <div className={style.success}>
            <GrayCircle />
            <Checkmark className={style.checkmark} />
          </div>
        </CustomCard>
        <FingerprintButton text="Add Device" onClick={addCredentialHandler} />
      </div>
      {error && <Toast message={error} />}
      {loading && <Loader loading={loading} />}
      <Dots className={`${registerStyle["dots-left"]} ${style.dots}`} />
      <Dots className={`${registerStyle["dots-right"]} ${style.dots}`} />
    </div>
  );
};

export default AddCredential;
