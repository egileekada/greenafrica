import LogoIcon from "assets/svgs/logo.svg";
import Link from "next/link";


const Navbar = () => {
  return (
    <nav className="nav bg-primary-main fit-x-bleed flex items-center justify-between py-7">
      <Link href="/">
        <figure>
          <LogoIcon />
        </figure>
      </Link>
      <ul className="hidden tab:flex items-center">
        <li>
          <Link href="/de">
            <a className="mr-16 text-white font-body text-sm">Destinations</a>
          </Link>
        </li>
        <li>
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
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
