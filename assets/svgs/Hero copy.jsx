// import { useState } from "react";
// import Tab1 from "../../containers/home/Tab1";
// import Tab2 from "../../containers/home/Tab2";
// import Tab3 from "../../containers/home/Tab3";
// import Tab4 from "../../containers/home/Tab4";
// import Tab5 from "../../containers/home/Tab5";

// import BriefCase from "assets/svgs/suitcase.svg";
// import CheckIn from "assets/svgs/check-in.svg";
// import Plane from "assets/svgs/aircraft.svg";
// import Ascend from "assets/svgs/ascend.svg";
// import Star from "assets/svgs/star.svg";

// import Whatsapp from "assets/svgs/whatsapp.svg";
// import Support from "assets/svgs/support.svg";

// import { Slide } from "react-slideshow-image";
// import "react-slideshow-image/dist/styles.css";

// const Hero = () => {
//   const [activeTab, setActiveTab] = useState(1);

//   const images = [
//     {
//       url: "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1331&q=80",
//       caption: "Slide 3",
//     },
//     {
//       url: "https://images.unsplash.com/photo-1479920252409-6e3d8e8d4866?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
//       caption: "Slide 73",
//     },
//     {
//       url: "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1331&q=80",
//       caption: "Slide s 3",
//     },
//     {
//       url: "https://images.unsplash.com/photo-1479920252409-6e3d8e8d4866?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
//       caption: "Slide 7ddd 3",
//     },
//   ];

//   return (
//     <section className="w-full flex flex-col relative ">
//       <div className="basis-full bg-blue min-h-[300px]">
//         {/* <div className="bg-red-500 w-full h-full"> */}
//         <Slide>
//           {images.map((slideImage, index) => (
//             <div
//               className="each-slide"
//               style={{
//                 height: "100%",
//               }}
//               key={index}
//             >
//               <div
//                 style={{
//                   backgroundImage: `url(${slideImage.url})`,
//                   height: "100%",
//                 }}
//               >
//                 <span>{slideImage.caption}</span>
//               </div>
//             </div>
//           ))}
//         </Slide>
//         {/* </div> */}
//       </div>
//       <div className="basis-full bg-grey-ed min-h-[300px] relative">
//         {/* <div className="desktop__filter__container">
//           <div className="filter__header">
//             <button
//               onClick={() => setActiveTab(1)}
//               className={`${activeTab === 1 ? "active" : ""}`}
//             >
//               <Plane />
//               <span>Book My Flight</span>
//             </button>
//             <button
//               onClick={() => setActiveTab(2)}
//               className={`${activeTab === 2 ? "active" : ""}`}
//             >
//               <BriefCase />
//               <span>Manage My Bookings</span>
//             </button>
//             <button
//               onClick={() => setActiveTab(3)}
//               className={`${activeTab === 3 ? "active" : ""}`}
//             >
//               <CheckIn />
//               <span>Online Check-in</span>
//             </button>
//             <button
//               onClick={() => setActiveTab(4)}
//               className={`${activeTab === 4 ? "active" : ""}`}
//             >
//               <Ascend />
//               <span>Flight status</span>
//             </button>
//             <button
//               onClick={() => setActiveTab(5)}
//               className={`${activeTab === 5 ? "active" : ""}`}
//             >
//               <Star />
//               <span>Check Best Prices</span>
//             </button>
//           </div>
//           <div className="filter__content">
//             <div className="filter__container">
//               ]{activeTab === 1 && <Tab1 />}
//               {activeTab === 2 && <Tab2 />}
//               {activeTab === 3 && <Tab3 />}
//               {activeTab === 4 && <Tab4 />}
//               {activeTab === 5 && <Tab5 />}
//             </div>
//           </div>
//           <button className="whatsapp--btn">
//             <Whatsapp />
//           </button>
//           <button className="support--btn">
//             <Support />
//           </button>
//         </div> */}

//         {/* Mobile filter container */}
//       </div>
//     </section>
//   );
// };

// export default Hero;
