import BaseLayout from "layouts/Base";
import Newsletter from "components/Newsletter";

const OfficesPage = () => {
  return (
    <BaseLayout>
      <section className="w-full fit-x-bleed py-14">
        <h2 className="header-text">Offices</h2>
        <section className="offices__container">
          <div className="basis-full tab:basis-1/2 flex flex-col flex-shrink-0 mb-8 tab:mb-0">
            <div className="flex flex-col mb-14 ">
              <h3 className="text-[#26205E] text-xl font-body mb-4">
                Our Head Office
              </h3>
              <p className="text-[#26205E] text-sm">
                43B, Oduduwa Crescent GRA, Ikeja Lagos Nigeria
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-[#26205E] text-xl font-body mb-4">
                Our Branch Office
              </h3>
              <p className="text-[#26205E] text-sm">
                43B, Oduduwa Crescent GRA, Ikeja Lagos Nigeria
              </p>
            </div>
          </div>
          <div className="basis-full tab:basis-1/2 overflow-hidden">
            <figure className="w-full tab:w-[600px]">
              <img src="/images/map.png" alt="map" />
            </figure>
          </div>
        </section>
        <Newsletter />
      </section>
    </BaseLayout>
  );
};

export default OfficesPage;
