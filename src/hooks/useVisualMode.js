import { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (mode, replace = false) {

    setMode(mode);

    if (replace) {
      history[history.length - 1] = mode
    } else {
      history.push(mode);
    }
    setHistory([...history]);
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
