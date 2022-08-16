import Header from "layouts/Base/partials/Header";
import Footer from "layouts/Base/partials/Footer";
import { useEffect } from "react";
// import { useRouter } from "next/router";

const BaseLayout = ({ children }) => {

  // useEffect(() => {
  //   async function checkParams() {
  //     const clientSignature = localStorage.getItem("clientSignature");
  //     if (clientSignature) {
  //       dispatch(startSession());
  //     } else {
  //       dispatch(showWidget());
  //     }
  //   }
  //   checkParams();
  // }, []);

  return (
    <>
      <section className="w-full bg-white relative">
        <Header />
        {children}
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
