import React from "react";

import { ReactComponent as Windows } from "../../imgs/windows.svg";
import { ReactComponent as Apple } from "../../imgs/apple-logo.svg";
import { ReactComponent as Android } from "../../imgs/android.svg";
import { ReactComponent as Device } from "../../imgs/devices.svg";
import { PLATFORMS } from "../../hooks/platforms";

const AddCredential = function ({ os, ...props }) {
  return os === PLATFORMS.WINDOWS ? (
    <Windows {...props} />
  ) : os === PLATFORMS.APPLE ? (
    <Apple {...props} />
  ) : os === PLATFORMS.ANDROID ? (
    <Android {...props} />
  ) : (
    <Device {...props} />
  );
};

export default AddCredential;
