/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import CovidIcon from "assets/svgs/bell.svg";
// import { Spin } from "antd";
// import { getPostsWithSlug } from "services/postService";
// import toast from "react-hot-toast";
import Link from "next/link";

const NoticeHeader = () => {
  const [posts, setPosts] = useState([
    {
      slug: "sddh",
      title:
        "Due to the recent rise in aviation fuel scarcity in some major airports around the country, we would like to inform you of potential flight delays in the coming days. We shall keep you informed if there are changes to the timing of your flights while we endeavour to maintain our flight schedules and keep your journey safe and comfortable -gCare",
    },
    {
      slug: "eeet",
      title:
        "2 Due to the recent rise in aviation fuel scarcity in some major airports around the country, we would like to inform you of potential flight delays in the coming days. We shall keep you informed if there are changes to the timing of your flights while we endeavour to maintain our flight schedules and keep your journey safe and comfortable -gCare",
    },
    {
      slug: "gnngngng",
      title:
        "3 Due to the recent rise in aviation fuel scarcity in some major airports around the country, we would like to inform you of potential flight delays in the coming days. We shall keep you informed if there are changes to the timing of your flights while we endeavour to maintain our flight schedules and keep your journey safe and comfortable -gCare",
    },
  ]);
  const [activeIndex, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const changeActiveUpdates = () => {
    const POST_LENGTH = posts.length;
    if (POST_LENGTH > 0) {
      if (activeIndex === POST_LENGTH - 1) {
        setIndex(0);
      } else {
        setIndex(activeIndex + 1);
      }
    }
  };

  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const response = await getPostsWithSlug("important-updates");
  //         setPosts(response?.data?.item);
  //       } catch (err) {
  //         toast.error("Error occured");
  //       }
  //       setLoading(false);
  //     })();
  //   }, []);

  useEffect(() => {
    setInterval(() => {
      changeActiveUpdates();
    }, 16000);
  });

  return (
    <>
      <header className="w-full mx-auto relative px-8 lg:px-70 py-2 bg-primary-light">
        <div className="desktop">
          <div className="flex items-center overflow-x-hidden">
            <div className="marquee__svg">
              <CovidIcon className="mr-4" />
            </div>

            <div className="vertical--marquee">
              <div className="text--holder">
                {loading ? (
                  <div className="orange-loader">
                    <Spin />
                  </div>
                ) : (
                  <>
                    {posts.length > 0 ? (
                      posts.map((item, index) => {
                        return (
                          <Link href={item?.slug} key={item?.title}>
                            <a
                              className={activeIndex === index && `activeText`}
                            >
                              {item?.title}
                            </a>
                          </Link>
                        );
                      })
                    ) : (
                      <p>No Posts yet</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NoticeHeader;
