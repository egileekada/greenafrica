/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import BaseLayout from "layouts/Base";
import { getPageBySlug } from "../services";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ["travel_documents", "travel-documents"],
    () => getPageBySlug("travel-documents")
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Home = () => {
  const { data } = useQuery(["travel_documents", "travel-documents"], () =>
    getPageBySlug("travel-documents")
  );

  return (
    <>
      <Head>
        <title>
          Travel Documents — One flight closer to your dreams and destinations.
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
        <section className="w-full px-3.5 py-14 lg:fit-x-bleed support-docs">
          <div>
            <div
              className="story__post privacy_page"
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
