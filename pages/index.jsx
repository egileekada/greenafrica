/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";
import Newsletter from "components/Newsletter";
import Updates from "./components/Updates";
import Destinations from "./components/Destinations";
import HomePopup from "./components/HomePopup";
import HomeHero from "./components/Hero";

const Home = () => {
  
  return (
    <BaseLayout>
      <HomeHero />
      <section className="w-full px-3.5 py-24 lg:fit-x-bleed">
        <Destinations />
        <Updates />
        <Newsletter />
      </section>
      <HomePopup />
    </BaseLayout>
  );
};

export default Home;
