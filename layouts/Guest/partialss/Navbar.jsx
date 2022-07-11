import { useRef } from "react";
import LogoBlack from "assets/svgs/logoblack.svg";
import MobileLogo from "assets/svgs/logo-mob.svg";
import Trigger from "assets/svgs/trigger.svg";
import WhiteRight from "assets/svgs/white-right.svg";
import Plane from "assets/svgs/aircraft.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { EXPLORE, SERVICES, ABOUT, BOOK } from "utils/menu";

const Navbar = ({ cycleOpen }) => {
  const dropdownContainer = useRef("");
  const router = useRouter();

  const showDropdown = () => {
    dropdownContainer.current.classList.toggle("show");
  };

  const bookMenu = (
    <div className="nav--dropdown ">
      <div className="nav--dropdown--icon">
        <div className="flex flex-col justify-center items-center aero-indicator">
          <Plane className="fill-primary-main" />
          <h2 className="text-white">Book</h2>
        </div>
      </div>
      <div className="nav--dropdown--links">
        <ul className="flex flex-col flex-wrap h-[95%]">
          {BOOK.map((_item) => {
            return (
              <li key={_item.link}>
                <Link href={_item.link}>
                  <a className="text-black hover:text-primary-main flex items-center justify-between">
                    <span className="pr-2">{_item?.name}</span>
                    <WhiteRight />
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  const exploreMenu = (
    <div className="nav--dropdown ">
      <div className="nav--dropdown--icon">
        <div className="flex flex-col justify-center items-center aero-indicator">
          <Plane className="fill-primary-main" />
          <h2 className="text-white">Explore</h2>
        </div>
      </div>
      <div className="nav--dropdown--links">
        <ul className="flex flex-col flex-wrap h-[95%]">
          {EXPLORE.map((_item) => {
            return (
              <li key={_item.link}>
                <Link href={_item.link}>
                  <a className="text-black hover:text-primary-main flex items-center justify-between">
                    <span className="pr-2">{_item?.name}</span>
                    <WhiteRight />
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  const servicesMenu = (
    <div className="nav--dropdown ">
      <div className="nav--dropdown--icon">
        <div className="flex flex-col justify-center items-center aero-indicator">
          <Plane className="fill-primary-main" />
          <h2 className="text-white">Services</h2>
        </div>
      </div>
      <div className="nav--dropdown--links">
        <ul className="flex flex-col flex-wrap h-[95%]">
          {SERVICES.map((_item) => {
            return (
              <li key={_item.link}>
                <Link href={_item.link}>
                  <a className="text-black hover:text-primary-main flex items-center justify-between">
                    <span className="pr-2">{_item?.name}</span>
                    <WhiteRight />
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  const aboutMenu = (
    <div className="nav--dropdown ">
      <div className="nav--dropdown--icon">
        <div className="flex flex-col justify-center items-center aero-indicator">
          <Plane className="fill-primary-main" />
          <h2 className="text-white">About</h2>
        </div>
      </div>
      <div className="nav--dropdown--links">
        <ul className="flex flex-col flex-wrap h-[95%]">
          {ABOUT.map((_item) => {
            return (
              <li key={_item.link}>
                <Link href={_item.link}>
                  <a className="text-black hover:text-primary-main flex items-center  justify-between">
                    <span className="pr-2">{_item?.name}</span>
                    <WhiteRight />
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  return (
    <nav className="nav">
      <div className="desktop--nav">
        <figure
          onClick={() => router.push("/")}
          className="px-8 lg:px-70  flex items-center justify-center -mt-4 lg:basis-[1/4] flex-shrink cursor-pointer"
        >
          <LogoBlack />
        </figure>
        <div className="flex desktop--links">
          <ul className="link">
            {/* <li>
              <a onClick={showDropdown} className="group ">
                <span className="group-hover:text-primary-main">Book</span>
                <Caret className="group-hover:fill-primary-main" />
              </a>
            </li> */}

            <li>
              <Dropdown overlay={bookMenu} trigger={["hover"]}>
                <a
                  className="ant-dropdown-link flex items-center"
                  onClick={(e) => e.preventDefault()}
                >
                  <span>Book</span> <DownOutlined />
                </a>
              </Dropdown>
            </li>

            <li>
              <Dropdown overlay={exploreMenu} trigger={["hover"]}>
                <a
                  className="ant-dropdown-link flex items-center"
                  onClick={(e) => e.preventDefault()}
                >
                  <span>Explore</span> <DownOutlined />
                </a>
              </Dropdown>
            </li>

            <li>
              <Dropdown overlay={servicesMenu} trigger={["hover"]}>
                <a
                  className="ant-dropdown-link flex items-center"
                  onClick={(e) => e.preventDefault()}
                >
                  <span>Services</span> <DownOutlined />
                </a>
              </Dropdown>
            </li>
            <li>
              <Dropdown overlay={aboutMenu} trigger={["hover"]}>
                <a
                  className="ant-dropdown-link flex items-center"
                  onClick={(e) => e.preventDefault()}
                >
                  <span>About</span> <DownOutlined />
                </a>
              </Dropdown>
            </li>
          </ul>
          <ul className="cta">
            <li>
              <Link href="/mro">
                <a>Aero MRO</a>
              </Link>
            </li>
            <li>
              <Link href="/training">
                <a>Training (ATO)</a>
              </Link>
            </li>
          </ul>
          <ul className="auth">
            <li>
              <a
                rel="noreferrer noopener"
                target="_blank"
                href="https://book-flyaero.crane.aero/web/MemberLogin.xhtml"
              >
                Login
              </a>
            </li>
            <li>
              <a
                rel="noreferrer noopener"
                target="_blank"
                href="https://book-flyaero.crane.aero/web/MemberRegister.xhtml"
              >
                Register
              </a>
            </li>
          </ul>
        </div>
        {/* <div ref={dropdownContainer} className="aero-dropdown">
          <div className="basis-[100px] flex-grow-0 bg-black flex items-center justify-center">
            <div className="flex flex-col justify-center items-center aero-indicator">
              <Plane className="fill-primary-main" />
              <h2 className="text-white">Book</h2>
            </div>
          </div>
          <div className="basis-auto flex-grow">
            <ul className="flex flex-col flex-wrap h-40">
              <li>Menu 1</li>
              <li>Menu 1</li>
              <li>Menu 1</li>
              <li>Menu 1</li>
              <li>Menu 1</li>
              <li>Menu 1</li>
              <li>Menu 1</li>
              <li>Menu 1</li>
              <li>Menu 1</li>
              <li>Menu 1</li>
              <li>Menu 1</li>
              <li>Menu 1</li>
              <li>Menu 1</li>
              <li>Menu 1</li>
            </ul>
          </div>
        </div> */}
      </div>
      <div className="mobile--nav">
        <div className="flex items-center">
          <button onClick={cycleOpen} className="mr-4 cursor-pointer">
            <Trigger />
          </button>
          <Link passHref href="/">
            <figure className="flex items-center justify-center basis-[1/4] cursor-pointer">
              <MobileLogo />
            </figure>
          </Link>
        </div>
        <div className="flex items-center">
          <button className="btn-black">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
