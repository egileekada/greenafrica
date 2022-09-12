/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import BaseLayout from "layouts/Base";
import { getPageBySlug } from "../services";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["our_fleet", "our-fleet"], () =>
    getPageBySlug("our-fleet")
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Home = () => {
  const { data } = useQuery(["our_fleet", "our-fleet"], () =>
    getPageBySlug("our-fleet")
  );

  return (
    <>
      <Head>
        <title>
          Our Fleet — One flight closer to your dreams and destinations.
        </title>
        <meta
          name="title"
          content="Travel Documents — One flight closer to your dreams and destinations."
          key="title"
        />
        <meta
          property="og:title"
          content="Travel Documents — One flight closer to your dreams and destinations."
          key="ogTitle"
        />
        <meta
          property="twitter:title"
          content="Travel Documents — One flight closer to your dreams and destinations."
          key="twitterTitle"
        />
      </Head>

      <BaseLayout>
        <section className="w-full px-3.5 py-14 lg:fit-x-bleed">
          <h2 className="header-text mb-4">Our Fleet</h2>

          <div>
            <div
              className="story__post travel_docs"
              dangerouslySetInnerHTML={{
                __html: `${data?.data?.item.body}`,
              }}
            ></div>
          </div>
        </section>
      </BaseLayout>
    </>
  );
};

export default Home;
