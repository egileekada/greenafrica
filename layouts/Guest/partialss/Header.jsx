/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";

import CovidIcon from "assets/svgs/covid.svg";

import { Spin } from "antd";
import { getPostsWithSlug } from "services/postService";
import toast from "react-hot-toast";
import Link from "next/link";

const Header = () => {
  const [posts, setPosts] = useState([]);
  const [activeIndex, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    (async () => {
      try {
        const response = await getPostsWithSlug("important-updates");
        setPosts(response?.data?.item);
      } catch (err) {
        toast.error("Error occured");
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setInterval(() => {
      changeActiveUpdates();
    }, 8000);
  });

  return (
    <>
      <div className="bg-[#E5E5E5] flex items-center justify-between px-8 py-4 tab:hidden">
        <h2 className="text-sm font-display text-black font-bold">
          Download The Aero App
        </h2>

        <button className=" rounded-[17px] bg-primary-main hover:bg-primary-light text-white px-6 py-2">
          Download
        </button>
      </div>
      <header className="w-full bg-grey-fa mx-auto relative px-8 lg:px-70 py-2">
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

export default Header;
