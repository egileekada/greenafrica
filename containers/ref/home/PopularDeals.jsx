/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import DealsIcon from "assets/svgs/deals.svg";
import { getPostsWithSlug } from "services/postService";
import { Spin } from "antd";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";

const PopularDeals = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const response = await getPostsWithSlug("deals-and-offers");
        setPosts(response?.data?.item);
      } catch (err) {
        toast.error("Error occured");
      }
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <section className="w-full flex flex-col fit-bleed py-32">
        <div className="flex items-center justify-between my-10">
          <div className="flex">
            <DealsIcon className="mr-4" />

            <div className="flex-col">
              <h6 className="text-caption">Relax with Aero</h6>
              <h3 className="text-title">Deals & Offers</h3>
            </div>
          </div>
          {/* <button className="btn btn-white">See More News</button> */}
        </div>
        <section className="popular__deals my-10">
          {loading ? (
            <div className="orange-loader">
              <Spin />
            </div>
          ) : (
            <>
              {posts.length > 0 ? (
                posts.map((item) => {
                  return (
                    <div key={item?.slug} className="popular__item">
                      <figure>
                        <img
                          src={item?.image || "/images/1.png"}
                          alt="images"
                        />
                      </figure>

                      <Link href={`/${item?.slug}`}>
                        <a>{item?.title}</a>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <p>No Posts yet</p>
              )}
            </>
          )}
        </section>
        {posts.length > 0 && (
          <div className="flex items-center justify-center">
            <button
              onClick={() => router.push("/deals")}
              className="btn btn-white"
            >
              View All Offers
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default PopularDeals;
