import { useState } from "react";

export const useDelay = function (intial, time = 4000) {
  const [state, setState] = useState(intial);
  const changeDelay = (state) => {
    setState(state);
    setTimeout(() => {
      setState(intial);
    }, time);
  };

  return [state, changeDelay];
};
