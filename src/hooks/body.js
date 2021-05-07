import { useEffect } from "react";

export const useBody = function (isHidden = true) {
  const body = window.document.querySelector("body");
  useEffect(() => {
    if (isHidden) {
      const html = window.document.querySelector("html");
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [body, isHidden]);
};
