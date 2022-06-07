import { useEffect, useState } from "react";

const useDebounce = (value) => {
  const [debounce, setDebounce] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(value);
    }, 500);
    return () => clearTimeout(handler);
  }, [value]);

  return debounce;
};

export default useDebounce;
