import React, { useState } from "react";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import LogoIcon from "assets/svgs/logo.svg";
import Link from "next/link";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="nav bg-primary-main fit-x-bleed flex items-center justify-between py-6 md:py-6">
        <Link href="/">
          <figure className="cursor-pointer">
            <LogoIcon />
          </figure>
        </Link>
        <button
          className={
            open
              ? "lg:hidden p-0 hamburger hamburger--stand is-active"
              : "lg:hidden p-0 hamburger hamburger--stand"
          }
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>

        <ul className="hidden tab:flex items-center">
          <li>
            <Link href="/e">
              <a className="mr-16 text-white font-body text-sm">Destinations</a>
            </Link>
          </li>
          {/* <li>
          <Link href="/de">
            <a className="mr-16 text-white font-body text-sm">Support</a>
          </Link>
        </li> */}
          <li>
            <Link href="/">
              <a className="mr-16 text-white font-body text-sm">Information</a>
            </Link>
          </li>
          <li className="text-white">
            <Link href="/">
              <Dropdown
                inline
                label={
                  <>
                    <svg
                      class="h-4.5 w-4.5 rounded-full mr-2"
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
                        stroke-width="0.5"
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
                          stroke-width="0.5"
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
                          fill-rule="evenodd"
                          clip-rule="evenodd"
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
                    class="block text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    <div class="inline-flex items-center">
                      <svg
                        class="h-3.5 w-3.5 rounded-full mr-2"
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
                          stroke-width="0.5"
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
                            stroke-width="0.5"
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
                            fill-rule="evenodd"
                            clip-rule="evenodd"
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
                    class="block text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    <div class="inline-flex items-center">
                      <svg
                        class="h-3.5 w-3.5 rounded-full mr-2"
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
              <ul className="list-unstyled with-sub grid grid-cols-2 gap-4">
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

      <div className="hidden">
        <Navbar className="bg-primary-main">
          <React.Fragment key=".0">
            <Navbar.Brand href="https://flowbite.com/">
              <figure className="cursor-pointer">
                <LogoIcon />
              </figure>
            </Navbar.Brand>

            <div class="flex items-center md:order-2">
              <Dropdown
                inline
                label={
                  <>
                    <svg
                      class="mr-2 w-5 h-5 rounded-full"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 3900 3900"
                    >
                      <path fill="#b22234" d="M0 0h7410v3900H0z"></path>
                      <path
                        d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
                        stroke="#fff"
                        stroke-width="300"
                      ></path>
                      <path fill="#3c3b6e" d="M0 0h2964v2100H0z"></path>
                      <g fill="#fff">
                        <g id="d">
                          <g id="c">
                            <g id="e">
                              <g id="b">
                                <path
                                  id="a"
                                  d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
                                ></path>
                                <use xlinkHref="#a" y="420"></use>
                                <use xlinkHref="#a" y="840"></use>
                                <use xlinkHref="#a" y="1260"></use>
                              </g>
                              <use xlinkHref="#a" y="1680"></use>
                            </g>
                            <use xlinkHref="#b" x="247" y="210"></use>
                          </g>
                          <use xlinkHref="#c" x="494"></use>
                        </g>
                        <use xlinkHref="#d" x="988"></use>
                        <use xlinkHref="#c" x="1976"></use>
                        <use xlinkHref="#e" x="2470"></use>
                      </g>
                    </svg>
                    English (US)
                  </>
                }
              >
                <Dropdown.Item>
                  <a
                    href="#"
                    class="block text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    <div class="inline-flex items-center">
                      <svg
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
                          stroke-width="0.5"
                        />
                        <mask
                          id="mask0_328_7139"
                          // style="mask-type:alpha"
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
                            stroke-width="0.5"
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
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0 16H7.66667V0H0V16Z"
                            fill="#189B62"
                          />
                        </g>
                      </svg>
                      English (US)
                    </div>
                  </a>
                </Dropdown.Item>
                <Dropdown.Item>
                  <a
                    href=""
                    class="block text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    <div class="inline-flex items-center">
                      <svg
                        class="h-3.5 w-3.5 rounded-full mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        id="flag-icon-css-de"
                        viewBox="0 0 512 512"
                      >
                        <path fill="#ffce00" d="M0 341.3h512V512H0z"></path>
                        <path d="M0 0h512v170.7H0z"></path>
                        <path fill="#d00" d="M0 170.7h512v170.6H0z"></path>
                      </svg>
                      Deutsch
                    </div>
                  </a>
                </Dropdown.Item>
              </Dropdown>
              <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
              <Navbar.Link active href="/navbars">
                Home
              </Navbar.Link>
              <Navbar.Link href="/navbars">About</Navbar.Link>
              <Navbar.Link href="/navbars">Services</Navbar.Link>
              <Navbar.Link href="/navbars">Pricing</Navbar.Link>
              <Navbar.Link href="/navbars">Contact</Navbar.Link>
            </Navbar.Collapse>
          </React.Fragment>
        </Navbar>
      </div>
    </>
  );
};

export default Navigation;
