import { useEffect, useState } from "react";

const usePrint = () => {
  const [print, setPrint] = useState(false);
  useEffect(() => {
    setPrint(true);
  }, []);
  return print;
};

export default usePrint;
