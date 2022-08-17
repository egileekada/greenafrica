import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import BaseLayout from "layouts/Base";
import Newsletter from "components/Newsletter";

import { getPosts } from "../services";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["posts"], getPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const flightSchedule = () => {
  const [filter, setFilter] = useState("");
  const { data: posts } = useQuery(["posts"], getPosts);

  const filteredData = useMemo(
    () =>
      posts?.data.items.filter((post) =>
        post.title.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, posts]
  );

  return (
    <BaseLayout>
      <section className="w-full px-3.5 py-10 lg:fit-x-bleed bg-primary-main grid grid-cols-1 lg:auto-cols-max lg:grid-flow-col items-end">
        <div className="text-center w-full">
          <p className="text-green uppercase">NEWS FROM THE CABIN</p>
          <h1 className="text-white font-semibold text-5xl mt-4">
            Green Africa Newsroom
          </h1>
        </div>
        <div className="relative white w-1/2 lg:w-full mx-auto mt-6 lg:mt-0 blog__search">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-white border-none w-full"
            onChange={(e) => setFilter(e.target.value)}
          />
          <img
            src="/images/icon-search.svg"
            alt=""
            className="absolute right-3 bottom-3"
          />
        </div>
      </section>
      <section className="w-full px-3.5 py-10 lg:fit-x-bleed bg-[#F4F4F4]">
        <div className="container mx-auto mb-10">
          {filteredData.length > 0 ? (
            filteredData.map((post, index) => {
              return (
                post.category_id !== 2 && (
                  <a
                    href={`/blog/${post.slug}`}
                    className="grid grid-cols-1 md:grid-cols-2 border gap-10 p-3 md:px-20 md:py-10 rounded-lg items-center bg-white my-10 blog__post"
                  >
                    <div className="order-last md:order-first px-4 md:px-0">
                      <p className="uppercase font-semibold">
                        {" "}
                        {format(new Date(post.created_at), "MMMM dd, yyyy")}
                      </p>
                      <h1 className="font-semibold text-2xl">{post.title}</h1>
                      <p className="text-base font-thin my-5 ">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="text-center">
                      <img
                        src={post.image_url}
                        alt={post.meta_description}
                        className="rounded-lg object-cover lg:w-2/4 w-full mx-auto"
                      />
                    </div>
                  </a>
                )
              );
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

          {/* {posts.data.items.map((post, index) => {
            return (
              post.category_id !== 2 && (
                <a
                  href={`/blog/${post.slug}`}
                  className="grid grid-cols-1 md:grid-cols-2 border gap-10 p-3 md:px-20 md:py-10 rounded-lg items-center bg-white my-10 blog__post"
                >
                  <div className="order-last md:order-first px-4 md:px-0">
                    <p className="uppercase font-semibold">
                      {" "}
                      {format(new Date(post.created_at), "MMMM dd, yyyy")}
                    </p>
                    <h1 className="font-semibold text-2xl">{post.title}</h1>
                    <p className="text-base font-thin my-5 ">{post.excerpt}</p>
                  </div>
                  <div className="text-center">
                    <img
                      src={post.image_url}
                      alt={post.meta_description}
                      className="rounded-lg object-cover lg:w-2/4 w-full mx-auto"
                    />
                  </div>
                </a>
              )
            );
          })} */}
        </div>

        <Newsletter />
      </section>
    </BaseLayout>
  );
};

export default flightSchedule;
