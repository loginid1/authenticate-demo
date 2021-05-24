import React, { useState, useEffect } from "react";
import platform from "platform";
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
import { ReactComponent as GreenCircle } from "../../imgs/circle_green.svg";
import { ReactComponent as Checkmark } from "../../imgs/checkmark.svg";

import { useUserState } from "../../contexts/User";
import { useDelay } from "../../hooks/delay";
import { base64ToBuffer, bufferToBase64 } from "../../utils/crypto";
import {
  credentialsInit,
  credentialsComplete,
  credentialsList,
} from "../../services/loginid";

const AddCredential = function ({ addingCredential = false }) {
  useBody();
  const { user } = useUserState();
  const [error, setError] = useDelay("");
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const history = useHistory();

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
        options: {
          credential_name: `${platform.os.family} (${platform.name})`,
        },
      };

      await credentialsComplete(completePayload);
      history.replace("/credentials");
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (addingCredential) {
        const osAndVersion = `${platform.os.family} (${platform.name})`;
        const item = { name: osAndVersion, added: false };

        setLoading(false);
        setList([item]);
      } else {
        let { credentials } = await credentialsList(user.id);
        credentials = credentials.map(({ name }) => ({
          name: name.split("-")[0].trim(),
          added: true,
        }));

        setLoading(false);
        setList(credentials);
      }
    };
    init();
  }, [user.id, addingCredential]);

  return (
    <div className={style.main}>
      <Header />
      <div className={style.center}>
        <h1 className={style.title}>
          {addingCredential ? "Add Your New Device" : "Your Devices"}
        </h1>
        {list.map(({ name, added }, index) => {
          return (
            <CustomCard key={index}>
              <div className={style.info}>
                <OSImage os={name} width="50px" height="60px" />
                <p>{name}</p>
              </div>
              <div className={style.success}>
                {added ? <GreenCircle /> : <GrayCircle />}
                <Checkmark className={style.checkmark} />
              </div>
            </CustomCard>
          );
        })}
        {addingCredential && (
          <FingerprintButton text="Add Device" onClick={addCredentialHandler} />
        )}
      </div>
      {error && <Toast message={error} />}
      {loading && <Loader loading={loading} />}
      <Dots className={`${registerStyle["dots-left"]} ${style.dots}`} />
      <Dots className={`${registerStyle["dots-right"]} ${style.dots}`} />
    </div>
  );
};

export default AddCredential;
