import Link from "next/link";
import GreenLogo from "assets/svgs/logo.svg";
import { FOOTER__EXPLORE, FOOTER__HELP } from "utils/footer";

import FacebookIcon from "assets/svgs/facebook.svg";
import TwitterIcon from "assets/svgs/twitter.svg";
import InstagramIcon from "assets/svgs/instagram.svg";
import LinkedinIcon from "assets/svgs/linkedin.svg";

const Footer = () => {
  return (
    <section className="ga__footer">
      <section className="fit-x-bleed flex flex-col items-center md:items-start">
        <figure className="mb-14">
          <GreenLogo />
        </figure>
        <div className="w-full flex flex-wrap md:flex-nowrap">
          <div className="ga__footer__item">
            <div className="ga__footer__item__box">
              <p className="text-white font-body text-sm mb-8">Follow Us</p>
              <ul className="flex items-center">
                <li className="mr-8">
                  <a
                    href="https://web.facebook.com/greenafricaairways/"
                    target="_blank"
                  >
                    <figure>
                      <FacebookIcon />
                    </figure>
                  </a>
                </li>
                <li className="mr-8">
                  <a href="https://twitter.com/greenafrica" target="_blank">
                    <figure>
                      <TwitterIcon />
                    </figure>
                  </a>
                </li>
                <li className="mr-8">
                  <a
                    href="https://www.instagram.com/greenafrica__/"
                    target="_blank"
                  >
                    <figure>
                      <InstagramIcon />
                    </figure>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/greenafricaairways"
                    target="_blank"
                  >
                    <figure>
                      <LinkedinIcon />
                    </figure>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="ga__footer__item">
            <h5>About Green Africa</h5>
            <ul className="ga__footer__item__box">
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
          <div className="ga__footer__item">
            <h5>Support</h5>
            <ul className="ga__footer__item__box">
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
        <p className="text-center text-sm text-white mb-20 md:mb-2">
          &copy; {new Date().getFullYear()} Green Africa Airways Limited. All
          rights reserved. Usage of this website states your compliance with our{" "}
          <Link href="/terms-and-condition">
            Terms and Conditions of Carriage
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default Footer;
