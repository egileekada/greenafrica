import BaseLayout from "layouts/Base";
import Newsletter from "components/Newsletter";

import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { getOffices } from "../services";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["offices"], getOffices);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const OfficesPage = () => {
  const { data, isLoading, isFetching } = useQuery(["offices"], getOffices, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <BaseLayout>
      <section className="w-full fit-x-bleed py-14">
        <h2 className="header-text">Offices</h2>
        <section className="offices__container">
          <div className="basis-full tab:basis-1/2 flex flex-col flex-shrink-0 mb-8 tab:mb-0">
            {data?.data.items.map((office) => (
              <div className="flex flex-col mb-14" key={office.id}>
                <h3 className="text-[#26205E] text-xl font-body mb-4">
                  {office.name}
                </h3>
                <p className="text-[#26205E] text-sm">{office.address}</p>
              </div>
            ))}
          </div>
          <div className="basis-full tab:basis-1/2 overflow-hidden">
            <figure className="w-full tab:w-[600px]">
              <img src="/images/map.png" alt="map" />
            </figure>
          </div>
        </section>
        <Newsletter />
      </section>
    </BaseLayout>
  );
};

export default OfficesPage;
