import { useState, useEffect } from "react";

export const useMaxWidth = function (width) {
  const [isMaxWidth, setIsMaxWidth] = useState(false);

  useEffect(() => {
    if (window.innerWidth > width) {
      setIsMaxWidth(true);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth > width) {
        setIsMaxWidth(true);
      } else {
        setIsMaxWidth(false);
      }
    });
  }, [width]);

  return isMaxWidth;
};
