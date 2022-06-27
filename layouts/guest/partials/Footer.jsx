/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import CallIcon from "assets/svgs/call-outline.svg";
import MailIcon from "assets/svgs/mail-outline.svg";
import LocationIcon from "assets/svgs/location-outline.svg";
import InstaIcon from "./svgs/insta.svg";
import TWIcon from "./svgs/twitter.svg";
import FBIcon from "./svgs/facebook.svg";
import LogoWhite from "assets/svgs/logowhite.svg";
import { EXPLORE, SERVICES, ABOUT, QUICK_LINKS } from "utils/footer";

const Footer = () => {
  return (
    <footer className="footer ">
      <div className="flex flex-col md:flex-row items-center justify-between px-70 py-8">
        <Link href="/" passHref>
          <figure className="cursor-pointerÉ">
            <LogoWhite />
          </figure>
        </Link>

        <ul className="badges">
          {/* <li>
            <figure>
              <img src="/images/airline.png" alt="interscwitvh" />
            </figure>
          </li>
          <li>
            <figure>
              <img src="/images/trax.png" alt="interscwitvh" />
            </figure>
          </li>
          <li>
            <figure>
              <img src="/images/year.png" alt="interscwitvh" />
            </figure>
          </li> */}
        </ul>
        <div className="flex flex-col justify-center">
          <h3>Connect With Us</h3>
          <div className="flex items-center">
            <a
              className="mr-4"
              rel="noreferrer noopener"
              target="_blank"
              href="https://www.instagram.com/aerohighflyers/"
            >
              <InstaIcon />
            </a>
            <a
              className="mr-4"
              rel="noreferrer noopener"
              target="_blank"
              href="https://www.twitter.com/@flyaero"
            >
              <TWIcon />
            </a>
            <a
              className="mr-4"
              rel="noreferrer noopener"
              target="_blank"
              href="https://www.facebook.com/aerocontractors"
            >
              <FBIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row p-70">
        <div className="footer--box">
          <h3> Explore</h3>
          <ul className="footer--links">
            {EXPLORE.map((_item) => {
              return (
                <li key={_item.link}>
                  <Link href={_item.link}>
                    <a> {_item.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="footer--box">
          <h3> Services</h3>
          <ul className="footer--links">
            {SERVICES.map((_item) => {
              return (
                <li key={_item.link}>
                  <Link href={_item.link}>
                    <a> {_item.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="footer--box">
          <h3> About Us</h3>
          <ul className="footer--links">
            {ABOUT.map((_item) => {
              return (
                <li key={_item.link}>
                  <Link passHref href={_item.link}>
                    <a> {_item.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="footer--box flex-shrink md:ml-auto">
          <h3> Quick Links</h3>
          <ul className="footer--links">
            {QUICK_LINKS.map((_item) => {
              return (
                <li key={_item.link}>
                  <Link href={_item.link}>
                    <a> {_item.name}</a>
                  </Link>
                </li>
              );
            })}
            <li>
              <a href="mailto:tickethelpdesk@acn.aero">
                <MailIcon className="h-16 w-16 mr-4" />
                <span>HelpDesk</span>
              </a>
            </li>

            <li>
              <a href="tel:+2349159593899">
                <CallIcon className="h-16 w-16 mr-4" />
                <span>+234 1 4482542-3</span>
              </a>
            </li>
            <li>
              <Link href="">
                <a>
                  <LocationIcon className="h-16 w-16 mr-4" />
                  <span>
                    PMB 21090 Murtala Mohammed Domestic Airport Private Terminal
                    Ikeja, Lagos
                  </span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center text-white px-16 pt-8  pb-4 bg-[#1F1F1F]">
        <h6 className="text-caption text-center text-white ">
          Aero Contractors Company Of Nigeria Ltd | All rights Reserved
        </h6>
      </div>
      <div className="flex justify-center items-center text-white px-16 pb-8  bg-[#1F1F1F]">
        <h6 className="text-caption text-center text-white ">
          Developed by{" "}
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://scenariodevelopers.com/"
          >
            Scenario Developers
          </a>
        </h6>
      </div>
    </footer>
  );
};

export default Footer;
