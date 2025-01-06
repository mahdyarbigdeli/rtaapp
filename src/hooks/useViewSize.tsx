import { useEffect, useState } from "react";

export default function useViewSize() {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = dimensions.width < 500;
  const isDesktop = dimensions.width > 500;

  return {
    isMobile,
    isDesktop,
  };
}
