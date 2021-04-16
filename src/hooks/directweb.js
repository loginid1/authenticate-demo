import { useEffect, useState } from "react";

const DirectWeb = window.LoginID.directweb.DirectWeb;
const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const useDirectweb = function () {
  //add fido2 support here
  const [dw, setDw] = useState(new DirectWeb());

  useEffect(() => {
    setDw(new DirectWeb(baseUrl, apiKey));
  }, []);

  return dw;
};
