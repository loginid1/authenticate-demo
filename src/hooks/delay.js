import { useState, useCallback } from "react";

export const useDelay = function (intial, time = 4000) {
  const [state, setState] = useState(intial);
  const changeDelay = useCallback(
    (state) => {
      setState(state);
      setTimeout(() => {
        setState(intial);
      }, time);
    },
    [intial, time]
  );

  return [state, changeDelay];
};
