import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This finds the actual "App" div and scrolls IT to the top
    const appElement = document.querySelector(".App");
    if (appElement) {
      appElement.scrollTo(0, 0);
    }
    // And we still trigger the window just in case
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;