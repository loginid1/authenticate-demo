import { useState, useCallback, useEffect } from "react";

export const useDelay = function (intial, time = 4000) {
  const [state, setState] = useState(intial);
  const [id, setId] = useState(null);

  useEffect(() => {
    return () => clearTimeout(id);
  }, [id]);

  const changeDelay = useCallback(
    (state) => {
      setState(state);
      const id = setTimeout(() => {
        setState(intial);
      }, time);
      setId(id);
    },
    [intial, time]
  );

  return [state, changeDelay];
};
