import Link from "next/link";
import GreenLogo from "assets/svgs/logo.svg";
import { FOOTER__EXPLORE, FOOTER__HELP } from "utils/footer";

import FacebookIcon from "assets/svgs/facebook.svg"
import TwitterIcon from "assets/svgs/twitter.svg"
import InstagramIcon from "assets/svgs/instagram.svg"
import LinkedinIcon from "assets/svgs/linkedin.svg"

const Footer = () => {
  return (
    <section className="ga__footer">
      <section className="fit-x-bleed flex flex-col">
        <figure className="mb-14">
          <GreenLogo />
        </figure>
        <div className="flex">
          <div className="basis-1/3">
            <div className="flex flex-col">
              <p className="text-white font-body text-sm mb-8">Follow Us</p>
              <ul className="flex items-center">
                <li className="mr-8">
                  <figure>
                    <FacebookIcon />
                  </figure>
                </li>
                <li className="mr-8">
                  <figure>
                    <TwitterIcon />
                  </figure>
                </li>
                <li className="mr-8">
                  <figure>
                    <InstagramIcon />
                  </figure>
                </li>
                <li className="mr-8">
                  <figure>
                    <LinkedinIcon />
                  </figure>
                </li>
              </ul>
            </div>
          </div>
          <div className="basis-1/3">
            <ul className="flex flex-col">
              {FOOTER__EXPLORE.map((item) => {
                return (
                  <Link key={item?.link} href={item?.link}>
                    <a className="text-white font-body text-sm mb-4">
                      {item?.name}
                    </a>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="basis-1/3">
            <ul className="flex flex-col">
              {FOOTER__HELP.map((item) => {
                return (
                  <Link key={item?.link} href={item?.link}>
                    <a className="text-white font-body text-sm mb-4">
                      {item?.name}
                    </a>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
      <div className="line"></div>
      <div className="flex items-center justify-center fit-x-bleed">
        <p className="text-center text-sm text-white">
          &copy; {new Date().getFullYear()} Green Africa Airways Limited. All
          rights reserved. Usage of this website states your compliance with our
          Terms and Conditions of Carriage.
        </p>
      </div>
    </section>
  );
};

export default Footer;
