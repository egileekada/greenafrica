import Header from "./partials/Header";
import Navbar from "./partials/Navbar";
import Newsletter from "./partials/Newsletter";
import Partners from "./partials/Partners";
import Footer from "./partials/Footer";
// import Advert from "./partials/Advert";
import MobileNav from "./partials/MobileNav";
import Pixel from "components/Pixels";

import { useCycle } from "framer-motion";

const GuestLayout = ({ children, path }) => {
  const [open, cycleOpen] = useCycle(false, true);
  return (
    <>
      <Pixel name="Facebook_Pixel" />
      <section className="w-full bg-white relative">
        {open && (
          <div className="navMobile">
            <MobileNav open={open} cycleOpen={cycleOpen} />
          </div>
        )}

        <div className="fixed z-10 w-inherit">
          <Header />
          <Navbar cycleOpen={cycleOpen} />
        </div>
        <div id="con"></div>
        <div className="pt-[120px]">{children}</div>
        {/* <Advert /> */}
        <Newsletter />
        <Partners />
        <Footer />
      </section>
    </>
  );
};

GuestLayout.getInitialProps = async (ctx) => {
  return {
    path: "",
  };
};

export default GuestLayout;
