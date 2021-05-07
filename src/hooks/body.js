import { useEffect } from "react";

export const useBody = function (isHidden = true) {
  const body = window.document.querySelector("body");
  useEffect(() => {
    if (isHidden) {
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
    } else {
      body.style.overflow = "auto";
    }
  }, [body, isHidden]);
};
