import React, { useState } from "react";
import { Dropdown } from "flowbite-react";
import LogoIcon from "assets/svgs/logo.svg";
import Link from "next/link";

const Navigation = () => {
  const [open, sehrefpen] = useState(false);
  return (
    <>
      <nav className="nav bg-primary-main fit-x-bleed flex items-center justify-between py-6 md:py-2 relative font-body">
        <Link href="/">
          <figure className="cursor-pointer">
            <LogoIcon />
          </figure>
        </Link>
        <buthrefn
          className={
            open
              ? "lg:hidden p-0 hamburger hamburger--stand is-active"
              : "lg:hidden p-0 hamburger hamburger--stand"
          }
          type="buthrefn"
          aria-expanded="false"
          aria-label="hrefggle navigation"
          onClick={() => {
            sehrefpen(!open);
          }}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </buthrefn>

        <ul className="hidden tab:flex items-center">
          <li className="py-6">
            <Link href="/check-in">
              <a className="mr-16 text-white font-body text-sm">Check In</a>
            </Link>
          </li>
          <li>
            <Link href="/my-bookings">
              <a className="mr-16 text-white font-body text-sm">My Bookings</a>
            </Link>
          </li>

          <li className="nav-item py-6">
            <a className="mr-16 text-white font-body text-sm dropdown-toggle">
              Information
            </a>
            <div className="dropdown-menu dropdown-large hidden absolute pl-20">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <div className="grid grid-cols-3 p-10 gap-4">
                    <div>
                      <h3 className="uppercase">PLAN YOUR TRIP</h3>
                      <ul className="list-unstyled with-sub">
                        <li className="mt-0">
                          <Link href="#">Destinations</Link>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="uppercase">TRAVEL INFORMATION</h3>
                      <ul className="list-unstyled with-sub">
                        <li className="my-4">
                          <Link href="/fare-categories">Fare Categories</Link>
                        </li>
                        <li className="my-4">
                          <Link href="/travel-documents">Travel Documents</Link>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="uppercase">&nbsp;</h3>
                      <ul className="list-unstyled with-sub">
                        <li className="my-4">
                          <Link href="/faqs">FAQ</Link>
                        </li>
                        <li className="my-4">
                          <Link href="/our-fleet">Our Fleet</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <img
                    src="/images/navbanner.jpg"
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </li>
          <li className="text-white">
            <Link href="/">
              <Dropdown
                inline
                label={
                  <>
                    <svg
                      className="h-4.5 w-4.5 rounded-full mr-2"
                      width="23"
                      height="16"
                      viewBox="0 0 23 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.25"
                        y="0.25"
                        width="22.5"
                        height="15.5"
                        rx="1.75"
                        fill="white"
                        stroke="#F5F5F5"
                        strokeWidth="0.5"
                      />
                      <mask
                        id="mask0_328_7139"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="23"
                        height="16"
                      >
                        <rect
                          x="0.25"
                          y="0.25"
                          width="22.5"
                          height="15.5"
                          rx="1.75"
                          fill="white"
                          stroke="white"
                          strokeWidth="0.5"
                        />
                      </mask>
                      <g mask="url(#mask0_328_7139)">
                        <rect
                          x="15.3333"
                          width="7.66667"
                          height="16"
                          fill="#189B62"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0 16H7.66667V0H0V16Z"
                          fill="#189B62"
                        />
                      </g>
                    </svg>
                    English
                  </>
                }
              >
                <Dropdown.Item>
                  <a
                    href="#"
                    className="block text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    <div className="inline-flex items-center">
                      <svg
                        className="h-3.5 w-3.5 rounded-full mr-2"
                        width="23"
                        height="16"
                        viewBox="0 0 23 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.25"
                          y="0.25"
                          width="22.5"
                          height="15.5"
                          rx="1.75"
                          fill="white"
                          stroke="#F5F5F5"
                          strokeWidth="0.5"
                        />
                        <mask
                          id="mask0_328_7139"
                          style={{ maskType: "alpha" }}
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="23"
                          height="16"
                        >
                          <rect
                            x="0.25"
                            y="0.25"
                            width="22.5"
                            height="15.5"
                            rx="1.75"
                            fill="white"
                            stroke="white"
                            strokeWidth="0.5"
                          />
                        </mask>
                        <g mask="url(#mask0_328_7139)">
                          <rect
                            x="15.3333"
                            width="7.66667"
                            height="16"
                            fill="#189B62"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 16H7.66667V0H0V16Z"
                            fill="#189B62"
                          />
                        </g>
                      </svg>
                      English
                    </div>
                  </a>
                </Dropdown.Item>
                <Dropdown.Item>
                  <a
                    href=""
                    className="block text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    <div className="inline-flex items-center">
                      <svg
                        className="h-3.5 w-3.5 rounded-full mr-2"
                        // width="23"
                        // height="16"
                        width="16"
                        height="12"
                        viewBox="0 0 16 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="16" height="12" fill="#F5F8FB" />
                        <rect width="5" height="12" fill="#41479B" />
                        <rect x="11" width="5" height="12" fill="#E51D1D" />
                      </svg>
                      French
                    </div>
                  </a>
                </Dropdown.Item>
              </Dropdown>
            </Link>
          </li>
        </ul>
      </nav>

      <div className={open ? "mobile-active mobile" : "mobile-inactive mobile"}>
        <ul className="list-unstyled list--wrapper">
          <li className="nav--list">
            <div className="mobile--div">
              <h3 className="uppercase">PLAN YOUR TRIP</h3>
              <ul className="list-unstyled with-sub">
                <li className="mt-0">
                  <Link href="/destinations">Destinations</Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="nav--list">
            <div className="mobile--div">
              <h3 className="uppercase">TRAVEL INFORMATION</h3>
              <ul className="with-sub grid grid-cols-2 gap-4">
                <li className="mt-0">
                  <Link href="/fare-categories">Fare Categories</Link>
                </li>

                <li className="mt-0">
                  <Link href="/faqs">FAQ</Link>
                </li>

                <li className="mt-0">
                  <Link href="/travel-documents">Travel Documents</Link>
                </li>

                <li className="mt-0">
                  <Link href="/our-fleet">Our Fleet</Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navigation;
