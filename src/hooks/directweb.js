import { useEffect, useState } from "react";

const checkFido2Supported = window.LoginID.browser.default.isFido2Supported;
const DirectWeb = window.LoginID.directweb.DirectWeb;
const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const useDirectweb = function () {
  //add fido2 support here
  const [isFido2Supported, setIsFido2Supported] = useState(true);
  const [dw, setDw] = useState(new DirectWeb());

  useEffect(() => {
    checkFido2Supported().then((bool) => {
      if (bool) {
        setDw(new DirectWeb(baseUrl, apiKey));
      } else {
        setIsFido2Supported(false);
      }
    });
  }, []);

  return [isFido2Supported, dw];
};
