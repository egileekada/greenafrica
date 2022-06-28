import Link from "next/link";
import GreenLogo from "assets/svgs/logo.svg";
import { FOOTER__EXPLORE, FOOTER__HELP } from "utils/footer";

const Footer = () => {
  return (
    <section className="ga__footer">
      <section className="fit-x-bleed">
        <figure>
          <GreenLogo />
        </figure>
        <div className="flex">
          <div className="basis-1/3"></div>
          <div className="basis-1/3">
            <ul>
              {FOOTER__EXPLORE.map((item) => {
                return (
                  <Link key={item?.link} href={item?.link}>
                    <a>{item?.name}</a>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="basis-1/3">
            <ul>
              {FOOTER__HELP.map((item) => {
                return (
                  <Link key={item?.link} href={item?.link}>
                    <a>{item?.name}</a>
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
