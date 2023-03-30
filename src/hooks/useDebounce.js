import { useEffect, useState } from "react";

const useDebounce = (value, time = 500) => {
  const [debounce, setDebounce] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(value);
    }, time);
    return () => clearTimeout(handler);
  }, [value, time]);

  return debounce;
};

export default useDebounce;
