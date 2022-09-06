/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../../../../../services";
import useDeviceSize from "hooks/useWindowSize";
import CovidIcon from "assets/svgs/bell.svg";
import { useEffect, useState } from "react";

export const BANNER_SHOW = "greenBannerShow";

const NoticeHeader = () => {
  const { data } = useQuery(["notifications"], getNotifications);

  const [width] = useDeviceSize();

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(localStorage?.getItem(BANNER_SHOW) ?? true);
  }, []);

  return (
    <>
      {data?.data?.item.active == 1 && show && (
        <header className="w-full mx-auto relative px-8 lg:px-70 py-[18px] bg-primary-light">
          <div className="desktop">
            <div className="flex items-center">
              <figure className="marquee__svg">
                <CovidIcon className="mr-4" />
              </figure>
              {width > 768 ? (
                <p className="font-body text-white text-xs mb-0">
                  {data?.data?.item.contents}
                </p>
              ) : (
                <marquee
                  className="font-body text-white text-xs mb-0"
                  scrollamount="4"
                >
                  {data?.data?.item.contents}
                </marquee>
              )}
              <p
                onClick={() => {
                  setShow(false);
                  localStorage.setItem(BANNER_SHOW, false);
                }}
                className="text-white text-sm underline cursor-pointer ml-2"
              >
                Cancel
              </p>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default NoticeHeader;
