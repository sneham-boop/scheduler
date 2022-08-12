import { useState } from "react";

// This hook is used to manage modes for the appointment
// component.
const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [prevMode, setPrevMode] = useState([initial]);

  // Transtion to a new mode for appointment component
  const transition = (newMode, replace = false) => {
    if (!replace) {
      setPrevMode((prev) => {
        return [...prev, newMode];
      });
    } else {
      setPrevMode((prev) => {
        return [...prev];
      });
    }
    setMode(newMode);
  };

  // Go back a mode
  const back = () => {
    if (prevMode.length > 1) {
      setPrevMode((prev) => prev.slice(0, prev.length - 1));
      setMode(prevMode[prevMode.length - 2]);
    }
  };
  return { mode, transition, back };
};

export default useVisualMode;
