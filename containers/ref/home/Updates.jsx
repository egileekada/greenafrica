/* eslint-disable @next/next/no-img-element */
// import WheelIcon from "assets/wheel.svg";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Spin } from "antd";
import { getPostsWithSlug } from "services/postService";
import BellIcon from "assets/svgs/bell.svg";
import OrangeRightIcon from "assets/svgs/orange-right.svg";
import { useRouter } from "next/router";

const Updates = () => {
  const [posts, setPosts] = useState([]);
  const [bigPosts, setBigPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const requests = Promise.all([
          getPostsWithSlug("important-updates-big"),
          getPostsWithSlug("important-updates"),
        ]);
        const responses = await requests;
        setBigPosts(responses[0]?.data?.item);
        setPosts(responses[1]?.data?.item);
      } catch (err) {
        toast.error("Error occured");
      }
      setLoading(false);
    })();
  }, []);

  return (
    <section className="w-full flex flex-col fit-bleed">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between my-10">
        <div className="flex">
          <BellIcon className="mr-4" />
          <div className="flex-col">
            <h6 className="text-caption">More From Aero</h6>
            <h3 className="text-title">Important Updates</h3>
          </div>
        </div>
        <button
          onClick={() => router.push("/updates")}
          className="mt-4 md:mt-0 w-full btn btn-white md:w-auto"
        >
          See More Updates
        </button>
      </div>
      <section className="updates my-10">
        {loading ? (
          <div className="orange-loader">
            <Spin />
          </div>
        ) : (
          <>
            <>
              {bigPosts.length > 0 ? (
                <div className="basis-[35%] flex-grow-0 flex-shrink-0 flex mb-20 sm:mb-0">
                  {bigPosts.map((item) => {
                    return (
                      <div key={item?.id} className="updates__item full">
                        <figure>
                          <img
                            src={item.image || "/images/item.png"}
                            alt="images"
                          />
                        </figure>
                        <h4>{item?.title}</h4>
                        <button
                          onClick={() => router.push(`/${item.slug}`)}
                          className="mt-2 flex items-center justify-center"
                        >
                          <OrangeRightIcon />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>No Posts yet</p>
              )}
            </>
            <>
              {posts.length > 0 ? (
                <div className="basis-[60%] flex-grow-0 flex-shrink-0 flex  justify-between flex-wrap">
                  {posts.slice(0, 4).map((item) => {
                    return (
                      <div key={item?.id} className="updates__item">
                        <figure>
                          <img
                            src={item.image || "/images/item.png"}
                            alt="images"
                          />
                        </figure>
                        <h4>{item?.title}</h4>
                        <button
                          onClick={() => router.push(`/${item.slug}`)}
                          className="mt-2 flex items-center justify-center"
                        >
                          <OrangeRightIcon />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>No Posts yet</p>
              )}
            </>
          </>
        )}
      </section>
    </section>
  );
};

export default Updates;
