import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopComp = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollableElement = document.querySelector("#root");
    if (scrollableElement) {
      scrollableElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTopComp;
