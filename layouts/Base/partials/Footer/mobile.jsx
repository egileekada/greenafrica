import { NavLink } from "../../../../components/NavLink";
import Link from "next/link";

// export const MobileFooter = () => {
//   return (
//     <div className="mobileNav p-4 pl-0">
//       <ul className="mobileNav__items">
//         <li className="mobileNavItem">
//           <NavLink
//             className="mobileNavItem__link"
//             href="/"
//             activeClassName="mobileNavItem--active"
//           >
//             <a>
//               <span className="mobileNavItem__icon">
//                 <span
//                   className="tw-icon tw-icon-home "
//                   aria-hidden="true"
//                   role="presentation"
//                 >
//                   <svg
//                     width="25"
//                     height="25"
//                     viewBox="0 0 25 25"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M9.15722 20.7714V17.7047C9.1572 16.9246 9.79312 16.2908 10.581 16.2856H13.4671C14.2587 16.2856 14.9005 16.9209 14.9005 17.7047V17.7047V20.7809C14.9003 21.4432 15.4343 21.9845 16.103 22H18.0271C19.9451 22 21.5 20.4607 21.5 18.5618V18.5618V9.83784C21.4898 9.09083 21.1355 8.38935 20.538 7.93303L13.9577 2.6853C12.8049 1.77157 11.1662 1.77157 10.0134 2.6853L3.46203 7.94256C2.86226 8.39702 2.50739 9.09967 2.5 9.84736V18.5618C2.5 20.4607 4.05488 22 5.97291 22H7.89696C8.58235 22 9.13797 21.4499 9.13797 20.7714V20.7714"
//                       stroke="#47FF5A"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </span>
//               </span>
//               <span className="mobileNavItem__label">Home</span>
//             </a>
//           </NavLink>
//         </li>
//         <li className="mobileNavItem">
//           <NavLink
//             className="mobileNavItem__link"
//             href={`${process.env.NEXT_PUBLIC_CORPORATE_URL}checkin`}
//             activeClassName="mobileNavItem--active"
//           >
//             <a>
//               <span className="mobileNavItem__icon">
//                 <span
//                   className="tw-icon tw-icon-card-transferwise "
//                   aria-hidden="true"
//                   role="presentation"
//                 >
//                   <svg
//                     width="25"
//                     height="25"
//                     viewBox="0 0 25 25"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       clipRule="evenodd"
//                       d="M14.5 10.5005C14.5 9.11924 13.3808 8 12.0005 8C10.6192 8 9.5 9.11924 9.5 10.5005C9.5 11.8808 10.6192 13 12.0005 13C13.3808 13 14.5 11.8808 14.5 10.5005Z"
//                       stroke="#47FF5A"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       fillRule="evenodd"
//                       clipRule="evenodd"
//                       d="M11.9995 21C10.801 21 4.5 15.8984 4.5 10.5633C4.5 6.38664 7.8571 3 11.9995 3C16.1419 3 19.5 6.38664 19.5 10.5633C19.5 15.8984 13.198 21 11.9995 21Z"
//                       stroke="#47FF5A"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </span>
//               </span>
//               <span className="mobileNavItem__label">Check In</span>
//             </a>
//           </NavLink>
//         </li>
//         <li className="mobileNavItem mobileNavItem--call-href-action">
//           <NavLink
//             className="mobileNavItem__link"
//             href={`${process.env.NEXT_PUBLIC_CORPORATE_URL}bookings`}
//             activeClassName="mobileNavItem--active"
//           >
//             <a>
//               <span className="mobileNavItem__icon">
//                 <span
//                   className="tw-icon tw-icon-send"
//                   aria-hidden="true"
//                   role="presentation"
//                 >
//                   <svg
//                     width="25"
//                     height="25"
//                     viewBox="0 0 25 25"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M3.09277 9.40445H20.9167"
//                       stroke="#47FF5A"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M16.442 13.3097H16.4512"
//                       stroke="#47FF5A"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M12.0045 13.3097H12.0137"
//                       stroke="#47FF5A"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M7.55769 13.3097H7.56695"
//                       stroke="#47FF5A"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M16.442 17.1964H16.4512"
//                       stroke="#47FF5A"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M12.0045 17.1964H12.0137"
//                       stroke="#47FF5A"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M7.55769 17.1964H7.56695"
//                       stroke="#47FF5A"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M16.0438 2V5.29078"
//                       stroke="#47FF5A"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M7.96564 2V5.29078"
//                       stroke="#47FF5A"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       fillRule="evenodd"
//                       clipRule="evenodd"
//                       d="M16.2383 3.5791H7.77096C4.83427 3.5791 3 5.21504 3 8.22213V17.2718C3 20.3261 4.83427 21.9999 7.77096 21.9999H16.229C19.175 21.9999 21 20.3545 21 17.3474V8.22213C21.0092 5.21504 19.1842 3.5791 16.2383 3.5791Z"
//                       stroke="#47FF5A"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </span>
//               </span>
//               <span className="mobileNavItem__label">My Bookings</span>
//             </a>
//           </NavLink>
//         </li>
//         <li className="mobileNavItem">
//           <NavLink
//             className="mobileNavItem__link"
//             href="/flight-schedule"
//             activeClassName="mobileNavItem--active"
//           >
//             <a>
//               <span className="mobileNavItem__icon">
//                 <span
//                   className="tw-icon tw-icon-recipients "
//                   aria-hidden="true"
//                   role="presentation"
//                 >
//                   <svg
//                     width="25"
//                     height="25"
//                     viewBox="0 0 25 25"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M15.7161 16.2236H8.49609"
//                       stroke="#47FF5A"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M15.7161 12.0371H8.49609"
//                       stroke="#47FF5A"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M11.2511 7.86035H8.49609"
//                       stroke="#47FF5A"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       fillRule="evenodd"
//                       clipRule="evenodd"
//                       d="M15.9085 2.75C15.9085 2.75 8.23149 2.754 8.21949 2.754C5.45949 2.771 3.75049 4.587 3.75049 7.357V16.553C3.75049 19.337 5.47249 21.16 8.25649 21.16C8.25649 21.16 15.9325 21.157 15.9455 21.157C18.7055 21.14 20.4155 19.323 20.4155 16.553V7.357C20.4155 4.573 18.6925 2.75 15.9085 2.75Z"
//                       stroke="#47FF5A"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </span>
//               </span>
//               <span className="mobileNavItem__label">Flight Schedule</span>
//             </a>
//           </NavLink>
//         </li>
//       </ul>
//     </div>
//   );
// };

export const MobileFooter =()=> {
  return(
    <div className=" w-full bg-primary-main md:hidden flex items-center justify-around p-4 fixed z-[120] bottom-0 " >

         <NavLink
            className="!text-white flex flex-col items-center "
            href="/"
            activeClassName=" !text-[#47FF5A] flex flex-col items-center "
          >
            <a>
              <span className=" stroke-current  ">
                <span
                  className="tw-icon tw-icon-home "
                  aria-hidden="true"
                  role="presentation"
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.15722 20.7714V17.7047C9.1572 16.9246 9.79312 16.2908 10.581 16.2856H13.4671C14.2587 16.2856 14.9005 16.9209 14.9005 17.7047V17.7047V20.7809C14.9003 21.4432 15.4343 21.9845 16.103 22H18.0271C19.9451 22 21.5 20.4607 21.5 18.5618V18.5618V9.83784C21.4898 9.09083 21.1355 8.38935 20.538 7.93303L13.9577 2.6853C12.8049 1.77157 11.1662 1.77157 10.0134 2.6853L3.46203 7.94256C2.86226 8.39702 2.50739 9.09967 2.5 9.84736V18.5618C2.5 20.4607 4.05488 22 5.97291 22H7.89696C8.58235 22 9.13797 21.4499 9.13797 20.7714V20.7714"
                      
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
              <span className="mobileNavItem__label">Home</span>
            </a>
          </NavLink>
          <NavLink
            className="!text-white flex flex-col items-center "
            href={`${process.env.NEXT_PUBLIC_CORPORATE_URL}checkin`}
            activeClassName="  !text-[#47FF5A] flex flex-col items-center "
          >
            <a>
              <span className=" stroke-current ">
                <span
                  className="tw-icon tw-icon-card-transferwise "
                  aria-hidden="true"
                  role="presentation"
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.5 10.5005C14.5 9.11924 13.3808 8 12.0005 8C10.6192 8 9.5 9.11924 9.5 10.5005C9.5 11.8808 10.6192 13 12.0005 13C13.3808 13 14.5 11.8808 14.5 10.5005Z"
                      
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.9995 21C10.801 21 4.5 15.8984 4.5 10.5633C4.5 6.38664 7.8571 3 11.9995 3C16.1419 3 19.5 6.38664 19.5 10.5633C19.5 15.8984 13.198 21 11.9995 21Z"
                      
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
              <span className="mobileNavItem__label">Check In</span>
            </a>
          </NavLink>
          <NavLink
            className="!text-white flex flex-col items-center "
            href={`${process.env.NEXT_PUBLIC_CORPORATE_URL}bookings`}
            activeClassName=" !text-[#47FF5A] flex flex-col items-center  "
          >
            <a>
              <span className=" stroke-current  ">
                <span
                  className="tw-icon tw-icon-send"
                  aria-hidden="true"
                  role="presentation"
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.09277 9.40445H20.9167"
                      
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.442 13.3097H16.4512"
                      
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.0045 13.3097H12.0137"
                      
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.55769 13.3097H7.56695"
                      
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.442 17.1964H16.4512"
                      
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.0045 17.1964H12.0137"
                      
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.55769 17.1964H7.56695"
                      
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.0438 2V5.29078"
                      
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.96564 2V5.29078"
                      
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.2383 3.5791H7.77096C4.83427 3.5791 3 5.21504 3 8.22213V17.2718C3 20.3261 4.83427 21.9999 7.77096 21.9999H16.229C19.175 21.9999 21 20.3545 21 17.3474V8.22213C21.0092 5.21504 19.1842 3.5791 16.2383 3.5791Z"
                      
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
              <span className="mobileNavItem__label">My Bookings</span>
            </a>
          </NavLink>
          <NavLink
            className=" !text-white flex flex-col items-center "
            href="/flight-schedule"
            activeClassName=" !text-[#47FF5A] flex flex-col items-center "
          >
            <a>
              <span className="stroke-current">
                <span
                  className="tw-icon tw-icon-recipients "
                  aria-hidden="true"
                  role="presentation"
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7161 16.2236H8.49609"
                      
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.7161 12.0371H8.49609"
                      
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.2511 7.86035H8.49609"
                      
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.9085 2.75C15.9085 2.75 8.23149 2.754 8.21949 2.754C5.45949 2.771 3.75049 4.587 3.75049 7.357V16.553C3.75049 19.337 5.47249 21.16 8.25649 21.16C8.25649 21.16 15.9325 21.157 15.9455 21.157C18.7055 21.14 20.4155 19.323 20.4155 16.553V7.357C20.4155 4.573 18.6925 2.75 15.9085 2.75Z"
                      
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
              <span className="mobileNavItem__label">Flight Schedule</span>
            </a>
          </NavLink>
    </div>
  )
}
