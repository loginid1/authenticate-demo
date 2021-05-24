import React from "react";

import { ReactComponent as Windows } from "../../imgs/windows.svg";
import { ReactComponent as Apple } from "../../imgs/apple-logo.svg";
import { ReactComponent as Android } from "../../imgs/android.svg";
import { ReactComponent as Device } from "../../imgs/devices.svg";

const AddCredential = function ({ os, ...props }) {
  return os.includes("Win") ? (
    <Windows {...props} />
  ) : os.includes("iPhone") || os.includes("Mac") || os.includes("iPad") ? (
    <Apple {...props} />
  ) : os.includes("Android") ? (
    <Android {...props} />
  ) : (
    <Device {...props} />
  );
};

export default AddCredential;
