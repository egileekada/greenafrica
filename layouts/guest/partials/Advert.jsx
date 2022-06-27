/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import PolIcon from "assets/svgs/pol.svg";
import SlateIcon from "assets/svgs/slate.svg";
const Advert = () => {
  return (
    <section className="advert bg-black px-8 py-16 md:p-70 flex flex-wrap text-white">
      <div className="advert__left">
        <div className="flex">
          <SlateIcon className="mr-4" />
          <div className="flex flex-col">
            <h6 className="text-caption text-white mb-2">Go Mobile</h6>
            <h3 className="text-title text-white">Download Our App</h3>
          </div>
        </div>
        <h4>Get the Aero Mobile App Today</h4>
        <ul>
          <li className="flex items-center">
            <PolIcon />
            <span>Book Flights On The Go</span>
          </li>
          <li className="flex items-center">
            <PolIcon />
            <span>Keep Track Of Flights</span>
          </li>
          <li className="flex items-center">
            <PolIcon />
            <span>Manage Tickets</span>
          </li>
          <li className="flex items-center">
            <PolIcon />
            <span>And more services</span>
          </li>
          {/* <li className="flex items-center">
            <PolIcon />
            <span>Book Flights On The Go</span>
          </li> */}
        </ul>
        <div className="flex flex-wrap md:flex-nowrap mt-16">
          {/* <Link href="dddf">
            <a className="basis-auto mb-4 md:mb-0">
              <figure className="mr-8 advert__cta">
                <img src="/images/apple.png" alt="apple" />
              </figure>
            </a>
          </Link> */}
          <Link href="dddf">
            <a className="basis-auto">
              <figure className="advert__cta">
                <img src="/images/gog.png" alt="google" />
              </figure>
            </a>
          </Link>
        </div>
      </div>
      <div className="advert__right">
        <figure>
          <img src="/images/phone.png" alt="phone" />
        </figure>
        <figure>
          <img src="/images/screen.png" alt="phone two" />
        </figure>
      </div>
    </section>
  );
};

export default Advert;
