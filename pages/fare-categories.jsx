import BaseLayout from "layouts/Base";

import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { getFareRules } from "../services";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["farerules"], getFareRules);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const FareCategoriesPage = () => {
  const { data, isLoading, isFetching } = useQuery(
    ["farerules"],
    getFareRules,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <BaseLayout>
      <section className="w-full fit-x-bleed py-14">
        <h2 className="header-text">Fare Rules</h2>
        <p className="my-5">
          Our fares are structured to provide you with choices as you plan to
          fly with us.
        </p>
        <section className="">
          <div className="relative overflow-auto">
            <div class="overflow-x-auto relative rounded-lg">
              <table class="text-sm text-left text-dark border-collapse">
                <thead class="text-lg text-dark">
                  <tr className="">
                    <th
                      scope="col"
                      class="py-3 px-6 border-r border-b border-[#000000] border-opacity-10"
                    ></th>
                    <th
                      scope="col"
                      class="p-6 border-r border-b border-[#000000] border-opacity-10"
                    >
                      gSaver
                    </th>
                    <th
                      scope="col"
                      class="p-6 border-r border-b border-[#000000] border-opacity-10"
                    >
                      gClassic
                    </th>
                    <th
                      scope="col"
                      class="p-6 border-b border-[#000000] border-opacity-10"
                    >
                      gFlex
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data.items.map((farerule, index) => (
                    <tr
                      class="border-b border-[#000000] border-opacity-10 last:border-b-0"
                      key={index}
                    >
                      <th
                        scope="row"
                        class="p-6 font-medium text-dark whitespace-nowrap border-r border-[#000000] border-opacity-10"
                      >
                        {farerule.rule}
                      </th>

                      {farerule.descriptions.map((description, dIndex) => (
                        <td
                          class="p-6 border-r last:border-r-0 border-[#000000] border-opacity-10"
                          key={dIndex}
                        >
                          {description.description}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div class="absolute inset-0 pointer-events-none border border-[#000000] border-opacity-10 rounded-xl"></div>
          </div>
        </section>
      </section>
    </BaseLayout>
  );
};

export default FareCategoriesPage;
