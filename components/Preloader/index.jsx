import GreenLogo from "assets/svgs/logo.svg";
import PlaneLogo from "assets/svgs/plane.svg";

// if (typeof window !== "undefined") {
//   window.addEventListener("load", () => {
//     const preloader = document.querySelector(".ga__container");
//     const progressBar = document.querySelector(".bar__progress");

//     for (let i = 0; i <= 100; i++) {
//       progressBar.style.transition = "all 1s";
//       progressBar.style.width = i + "%";
//       preloader.classList.add("preload__finish");
//     }
//   });
// }

const Preloader = () => {
  return (
    <></>
    // <section className="ga__container">
    //   <section className="ga__loader">
    //     <GreenLogo className="mb-11" />
    //     <div className="ga__loader__track">
    //       <figure>
    //         <PlaneLogo />
    //       </figure>
    //       <div className="ga__loader__bar">
    //         <div className="ga__loader__bar bar__progress"></div>
    //       </div>
    //     </div>
    //     <p className="mt-11 text-white text-sm">Fasten Your Seatbelt</p>
    //   </section>
    // </section>
  );
};

export default Preloader;
