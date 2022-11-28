import Header from "layouts/Base/partials/Header";
import Footer from "layouts/Base/partials/Footer";
import { MobileFooter } from "layouts/Base/partials/Footer/mobile";
const BaseLayout = ({ children }) => {
  return (
    <>
      <section className="overflow-hidden w-full bg-white relative">
        <Header />
        <div>{children}</div>
        <MobileFooter />
        <Footer />
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
