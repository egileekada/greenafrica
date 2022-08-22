/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { getPosts } from "../../services";

const Updates = () => {
  const { data: posts } = useQuery(["posts"], getPosts);

  return (
    <Fragment>
      <div className="container mx-auto gid sm:grid-flow-col gap-x-24 my-5">
        <h1 className="text-primary-main font-semibold text-2xl mb-4">
          Important Updates
        </h1>
        {posts?.data?.items.map((post, index) => {
          return (
            post.category_id === 2 && (
              <div className="relative my-5 h-96" key={index}>
                <div className="absolute bottom-0 left-0 p-6 col-start-1 row-start-1 flex flex-col-reverse bg-primary-main lg:w-1/3 rounded-b-lg lg:rounded-bl-lg lg:rounded-br-none">
                  <h2 className="mt-3 font-medium text-white md:text-2xl dark:sm:text-white">
                    {post.title}
                  </h2>
                  <p className="text-xs font-medium text-white">
                    {format(new Date(post.created_at), "MMMM dd, yyyy")}
                  </p>
                </div>
                <img
                  src={post.image_url}
                  alt={post.meta_description}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
            )
          );
        })}
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-24 xl:gap-x-24 md:gap-x-5 mb-10">
        {posts?.data?.items.map((post) => {
          return (
            post.category_id !== 2 && (
              <div className="my-5" key={post.id}>
                <img
                  src={post.image_url}
                  alt={post.meta_description}
                  className="w-full h-80 object-cover rounded-lg"
                />
                <h6 className="text-lg text-primary-main font-header font-bold mt-5">
                  {post.title}
                </h6>
                <p className="text-base font-light text-primary-main mt-2">
                  {post.excerpt}
                </p>

                <a
                  href={`/blog/${post.slug}`}
                  className="btn btn-white mt-5 inline-block"
                >
                  {" "}
                  Read More
                </a>
              </div>
            )
          );
        })}
      </div>
    </Fragment>
  );
};

export default Updates;
