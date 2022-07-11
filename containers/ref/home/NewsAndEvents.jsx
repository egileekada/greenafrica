/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Spin } from "antd";
import { getPostsWithSlug } from "services/postService";
import NewsIcon from "assets/svgs/news.svg";
import BlackRight from "assets/svgs/black-right.svg";
import { useRouter } from "next/router";

const NewsAndEvents = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const response = await getPostsWithSlug("news-and-events");
        setPosts(response?.data?.item);
      } catch (err) {
        toast.error("Error occured");
      }
      setLoading(false);
    })();
  }, []);

  return (
    <section className="w-full flex flex-col fit-bleed">
      <div className="flex items-center justify-between my-10">
        <div className="flex">
          <NewsIcon className="mr-4" />
          <div className="flex-col">
            <h6 className="text-caption">Aero News Room</h6>
            <h3 className="text-title">News & Events</h3>
          </div>
        </div>
        <button
          onClick={() => router.push("/news")}
          className="hidden md:block btn btn-white"
        >
          See More News
        </button>
      </div>
      <section className="news__list my-10">
        {loading ? (
          <div className="orange-loader">
            <Spin />
          </div>
        ) : (
          <>
            {posts.length > 0 ? (
              <>
                {posts.slice(-4).map((item) => {
                  return (
                    <div key={item?.id} className="news__list__item">
                      <figure>
                        <img
                          src={item.image || "/images/item.png"}
                          alt="images"
                        />
                      </figure>
                      <h4>{item?.title}</h4>
                      <button onClick={() => router.push(`/${item.slug}`)}>
                        <span>Read More</span>
                        <BlackRight />
                      </button>
                    </div>
                  );
                })}
              </>
            ) : (
              <p>No News yet</p>
            )}
          </>
        )}
      </section>
      <div className="flex items-center justify-center">
        <button
          onClick={() => router.push("/news")}
          className="block md:hidden btn btn-white"
        >
          See More News
        </button>
      </div>
    </section>
  );
};

export default NewsAndEvents;
