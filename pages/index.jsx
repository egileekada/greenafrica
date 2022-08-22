/* eslint-disable @next/next/no-img-element */
import { dehydrate, QueryClient } from "@tanstack/react-query";
import BaseLayout from "layouts/Base";
import Newsletter from "components/Newsletter";
import Updates from "./components/Updates";
import Destinations from "./components/Destinations";
import HomeHero from "./components/Hero";
import Announcer from "./components/Announcer";
import {
  getBanner,
  getWidgetData,
  getDestinations,
  getPosts,
  getPopup,
} from "../services";

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["destination"], getWidgetData);
  await queryClient.prefetchQuery(["banners"], getBanner);
  await queryClient.prefetchQuery(["destination_matrices", "LOS"], () =>
    getDestinations("LOS")
  );
  await queryClient.prefetchQuery(["posts"], getPosts);
  await queryClient.prefetchQuery(["popups"], getPopup);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Home = () => {
  return (
    <BaseLayout>
      <HomeHero />
      <section className="w-full px-3.5 pb-24 lg:fit-x-bleed">
        <Destinations query={"LOS"} />
        <Updates />
        <Newsletter />
        <Announcer />
      </section>
    </BaseLayout>
  );
};

export default Home;
