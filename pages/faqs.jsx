/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import GuestLayout from "layouts/guest";
import Accordion from "components/ref/accordion";

import { Spin } from "antd";
import { getAllFaqs } from "services/general";

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getAllFaqs();
      setFaqs(response?.data?.item);
      setLoading(false);
    })();
  }, []);

  return (
    <GuestLayout>
      <section className="w-full md:w-[90%] lg:w-[70%] mx-auto flex flex-col fit-bleed">
        <div className="flex flex-col items-center justify-center my-12">
          <h3 className="text-title text-center mb-4">
            Frequently Asked Questions
          </h3>
          <h6 className="text-caption text-center w-[90%] md:w-[70%] text-grey-seven mt-2">
            We working with the process. Our works will answer what you need.
          </h6>
        </div>
        <div className="flex flex-wrap justify-between mt-10 ">
          {loading ? (
            <Spin />
          ) : (
            <>
              {faqs.length > 0 ? (
                faqs.map((item) => {
                  return <Accordion key={item?.title} item={item} />;
                })
              ) : (
                <p>No faqs yet</p>
              )}
            </>
          )}
        </div>
      </section>
    </GuestLayout>
  );
};

export default FAQs;
