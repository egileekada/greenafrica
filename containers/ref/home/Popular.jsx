/* eslint-disable @next/next/no-img-element */
// import WheelIcon from "assets/wheel.svg";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { getPostsWithSlug } from "services/postService";
import { Spin } from "antd";
import PlaneUpIcon from "assets/svgs/PlaneUp.svg";
import MarkerICon from "assets/svgs/marker.svg";
import ScrollLeftIcon from "assets/svgs/scrollLeft.svg";
import ScrollRightIcon from "assets/svgs/scollRight.svg";
import toast from "react-hot-toast";

const PopularLocations = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPostsWithSlug("destinations");
        setPosts(response?.data?.item);
      } catch (err) {
        toast.error("Error occured");
      }
      setLoading(false);
    })();
  }, []);

  const POPULAR_LOCATIONS = useRef();

  const scrollLeft = () => {
    POPULAR_LOCATIONS.current.scrollBy({
      top: 0,
      left: -500,
      behavior: "smooth",
    });
  };
  const scrollRight = () => {
    POPULAR_LOCATIONS.current.scrollBy({
      top: 0,
      left: +500,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full flex flex-col fit-bleed bg-[#F3F6FB]">
      <div className="flex items-center justify-between my-10">
        <div className="flex">
          <PlaneUpIcon className="mr-4" />
          <div className="flex-col">
            <h6 className="text-caption">Fly with Aero</h6>
            <h3 className="text-title">Popular Destinations</h3>
          </div>
        </div>
        <div className="d-flex items-center">
          <button className="mr-4" onClick={scrollLeft}>
            <ScrollLeftIcon />
          </button>
          <button onClick={scrollRight}>
            <ScrollRightIcon />
          </button>
        </div>
      </div>
      <section className="popular__locations my-10" ref={POPULAR_LOCATIONS}>
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
                        src={item?.image || "/images/item2.png"}
                        alt="images"
                      />
                      <div className="marker">
                        <MarkerICon />
                      </div>
                    </figure>
                    <h6> {item.title}</h6>
                    <h4 dangerouslySetInnerHTML={{ __html: item.body }}></h4>
                  </div>
                );
              })
            ) : (
              <p>No Posts yet</p>
            )}
          </>
        )}
      </section>
    </section>
  );
};

export default PopularLocations;
