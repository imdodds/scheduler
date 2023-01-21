import { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (mode, replace = false) {

    if (replace) {
      setHistory(prev => ([...prev.slice(0, prev.length -1), mode]))
      setMode(mode)
    } else {
      setMode(mode)
      setHistory(prev => ([...prev, mode]));
    }
  }

  function back () {

    if (history.length < 2) {
      return history;
    }
    setHistory(prev => (prev.slice(0, prev.length - 1)));
    setMode(history[history.length - 2]);
    return mode;
  }
  
  return { mode, transition, back };
}