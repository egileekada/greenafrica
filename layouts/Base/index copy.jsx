import Header from "layouts/Base/partials/Header";
import Footer from "layouts/Base/partials/Footer";

const BaseLayout = (props) => {
  return (
    <>
      <section className="w-full bg-white relative">
        <Header />
        {props.children}
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
