import Header from "layouts/Base/partials/Header";
import Footer from "layouts/Base/partials/Footer";

const BaseLayout = ({ children, path }) => {
  return (
    <>
      <section className="w-full bg-white relative">
        <Header />
        <div>{children}</div>
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
