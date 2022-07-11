// import Header from "./partials/Header";
// import Navbar from "./partials/Navbar";
// import MobileNav from "./partials/MobileNav";

import { useCycle } from "framer-motion";

const BaseLayout = ({ children, path }) => {
  const [open, cycleOpen] = useCycle(false, true);
  return (
    <>
      <section className="w-full bg-white relative">
        {/* {open && (
          <div className="navMobile">
            <MobileNav open={open} cycleOpen={cycleOpen} />
          </div>
        )}

        <div className="fixed z-10 w-inherit">
          <Header />
          <Navbar cycleOpen={cycleOpen} />
        </div> */}
        <div>{children}</div>
        {/* <Footer /> */}
      </section>
    </>
  );
};

BaseLayout.getInitialProps = async (ctx) => {
  return {
    path: "",
  };
};

export default BaseLayout;
