/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";
import Newsletter from "components/Newsletter";
import Updates from "./components/Updates";
import Destinations from "./components/Destinations";
import HomeHero from "./components/Hero";
import Announcer from "./components/Announcer";

const Home = () => {
  return (
    <BaseLayout>
      <HomeHero />
      <section className="w-full px-3.5 pb-24 lg:fit-x-bleed">
        <Destinations />
        <Updates />
        <Newsletter />
        <Announcer />
      </section>
    </BaseLayout>
  );
};

export default Home;
