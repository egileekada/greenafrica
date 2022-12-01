import BackIcon from "assets/svgs/seats/arrowleft.svg";
import LogoIcon from "assets/svgs/logo.svg";
import Link from "next/link";
import { Fragment } from "react";

const Navbar = () => {
  return (
    <Fragment>
      <nav className="nav bg-primary-main fit-x-bleed items-center justify-between py-7 hidden lg:flex">
        <a href="https://dev-website.gadevenv.com/">
          <figure className="cursor-pointer">
            <LogoIcon />
          </figure>
        </a>
        <ul className="hidden tab:flex items-center">
          <li>
            <Link href="/checkin">
              <a className="mr-16 text-white font-body text-sm hover:text-green">
                Check-in
              </a>
            </Link>
          </li>
          <li>
            <Link href="/bookings">
              <a className="mr-16 text-white font-body text-sm hover:text-green">
                Manage Booking
              </a>
            </Link>
          </li>
          {/* <li>
            <Link href="/de">
              <a className="mr-16 text-white font-body text-sm">Support</a>
            </Link>
          </li>
          <li>
            <Link href="/de">
              <a className="mr-16 text-white font-body text-sm">Information</a>
            </Link>
          </li>
          <li>
            <Link href="/de">
              <a className="mr-16 text-white font-body text-sm">English (NG)</a>
            </Link>
          </li> */}
        </ul>
      </nav>
      {/* <nav className="nav bg-primary-main fit-x-bleed  items-center justify-between py-7 flex lg:hidden fixed w-full z-50">
        <button className="flex items-center">
          <BackIcon />
          <span className="ml-6 text-white text-xs">ADDITIONAL SERVICES</span>
        </button>
      </nav> */}
    </Fragment>
  );
};

export default Navbar;
