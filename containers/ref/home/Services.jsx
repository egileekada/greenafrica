/* eslint-disable @next/next/no-img-element */
import MoreIcon from "assets/svgs/more.svg";
import WhiteRight from "assets/svgs/white-right.svg";
import Link from "next/link";

const Services = () => {
  const BOOKING = [
    {
      name: "Group Booking",
      link: "/booking/group",
    },
    {
      name: "Charter Services",
      link: "/booking/charter",
    },
    {
      name: "Helicopter Services",
      link: "/booking/helicopter",
    },
    {
      name: "Corporate Services",
      link: "/booking/corporate",
    },
  ];

  const SERVICES = [
    {
      name: "Aircraft Maintenance (Aero MRO)",
      link: "/mro",
    },
    {
      name: "AOG REQUEST",
      link: "/mro",
    },
    {
      name: "Join Our Trainning",
      link: "/training",
    },
    {
      name: "Executive Service",
      link: "/executive",
    },
    {
      name: "Cargo Service",
      link: "/pages/cargo-services",
    },
  ];

  const MORE = [
    {
      name: "Become A Travel Agent",
      link: "/agent",
    },
    {
      name: "Travel Agency Login",
      link: "https://flyaero.crane.aero/",
    },
    {
      name: "Complaints & Feedback",
      link: "/complaints",
    },

    // {
    //   name: "Feedback",
    //   link: "/feedabck",
    // },
    {
      name: "Request Refund",
      // link: "https://admin.scenariostaging.com/storage/notices/April2022/VlDSuwMgZxgrFBMXGX4m.pdf",
      link: "https://admin.scenariostaging.com/storage/notices/April2022/xylrx9muEOZmgt5Pldbz.pdf",
    },
  ];

  return (
    <section className="w-full flex flex-col fit-bleed">
      <div className="flex items-center justify-between my-10">
        <div className="flex">
          <MoreIcon className="mr-4" />
          <div className="flex-col">
            <h6 className="text-caption">More From Aero</h6>
            <h3 className="text-title">Additional Services</h3>
          </div>
        </div>
        {/* <button className="btn btn-white">See More News</button> */}
      </div>
      <section className="services my-10">
        <div className="services__item">
          <figure>
            <img src="/images/item.png" alt="images" />
            <div className="title">
              <h3 className="text-caption text-white">Booking</h3>
            </div>
          </figure>
          <ul>
            {BOOKING.map((item) => {
              return (
                <Link key={item.name} passHref href={item.link}>
                  <li className="cursor-pointer group">
                    <span className="group-hover:text-primary-main">
                      {item?.name}
                    </span>
                    <WhiteRight />
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="services__item">
          <figure>
            <img src="/images/service2.png" alt="images" />
            <div className="title">
              <h3 className="text-caption text-white">Services</h3>
            </div>
          </figure>
          <ul>
            {SERVICES.map((item) => {
              return (
                <Link key={item.name} passHref href={item.link}>
                  <li className="cursor-pointer group">
                    <span className="group-hover:text-primary-main">
                      {item?.name}
                    </span>
                    <WhiteRight />
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="services__item">
          <figure>
            <img src="/images/ser3.png" alt="images" />
            <div className="title">
              <h3 className="text-caption text-white">More</h3>
            </div>
          </figure>
          <ul>
            {MORE.map((item) => {
              return (
                <Link key={item.name} passHref href={item.link}>
                  <li className="cursor-pointer group">
                    <span className="group-hover:text-primary-main">
                      {item?.name}
                    </span>
                    <WhiteRight />
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </section>
    </section>
  );
};

export default Services;
