import { useState, useEffect } from "react";

const useDeviceSize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return [width, height];
};

export default useDeviceSize;


// const setPrev = () => {
//   clearInterval(timer.current);
//   let size = slide.current.clientWidth;
//   let newIndex = currIndex - 1;
//   item.current.style.transition = "all 1s ease-in-out";
//   if (newIndex < 0) {
//     setCurrIndex(2);
//     item.current.style.transform = "translateX(" + -size * 2 + "px)";
//   } else {
//     setCurrIndex(newIndex);
//     item.current.style.transform = "translateX(" + -size * newIndex + "px)";
//   }
// };
// const setNext = () => {
//   clearInterval(timer.current);
//   let size = slide.current.clientWidth;
//   let newIndex = currIndex + 1;
//   item.current.style.transition = "all 1s ease-in-out";
//   if (newIndex > 2) {
//     item.current.style.transform = "translateX(0)";
//     setCurrIndex(0);
//   } else {
//     item.current.style.transform = "translateX(" + -size * newIndex + "px)";
//     setCurrIndex(newIndex);
//   }
// };