/* eslint-disable @next/next/no-img-element */
import React, { useState, useMemo } from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import BaseLayout from "layouts/Base";
import Newsletter from "components/Newsletter";
import Accordion from "components/Accordion";
import SearchIcon from "assets/svgs/search.svg";
import { getFAQs, getFAQsCategory } from "../services";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["all_faqs"], getFAQs);
  await queryClient.prefetchQuery(["faq_category"], getFAQsCategory);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const FaPage = () => {
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState(null);

  const { data: all_faqs } = useQuery(["all_faqs"], getFAQs, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: faq_category } = useQuery(["faq_category"], getFAQsCategory);

  const sortData = (faq, filter, category) => {
    return category === null
      ? faq.question.toLowerCase().includes(filter.toLowerCase())
      : faq.question.toLowerCase().includes(filter.toLowerCase()) &&
          faq.category_id === category;
  };

  const filteredData = useMemo(
    () => all_faqs?.data.items.filter((faq) => sortData(faq, filter, category)),
    [filter, all_faqs, category]
  );

  return (
    <BaseLayout>
      <section className="w-full fit-x-bleed py-14">
        <h2 className="header-text">FAQS</h2>

        <section className="flex flex-col mb-8 md:mb-5">
          <section className="faqs__tabs my-6">
            <button
              className={`btn mr-4 ${
                category === null ? "btn-primary active" : "btn-outline"
              }`}
              onClick={() => setCategory(null)}
            >
              All
            </button>
            {faq_category?.data?.items.map((cat) => (
              <button
                className={`btn mr-4 ${
                  category === cat.id ? "btn-primary active" : "btn-outline"
                }`}
                key={cat.id}
                onClick={() => setCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </section>

          <div className="faq__input">
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search"
              onChange={(e) => setFilter(e.target.value)}
            ></input>
            <figure>
              <SearchIcon />
            </figure>
          </div>

          <>
            {filteredData.length > 0 ? (
              filteredData.map((item) => {
                return <Accordion key={item?.question} item={item} />;
              })
            ) : (
              <div className="mx-auto text-center my-20">
                <h1 className="text-3xl font-bold my-4">No results found</h1>
                <p className="text-base text-primary-main">
                  We could’t find any results relating to your search. try
                  searching for something else
                </p>
              </div>
            )}
          </>
        </section>

        <Newsletter />
      </section>
    </BaseLayout>
  );
};

export default FaPage;
