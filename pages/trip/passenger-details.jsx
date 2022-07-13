/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import BaseLayout from "layouts/Base";
import IbeSidebar from "containers/IbeSidebar";
import FlightIcon from "assets/svgs/flightcircle.svg";
import ArrowTo from "assets/svgs/arrowto.svg";

import AeroIcon from "assets/svgs/aero.svg";
import DottedLine from "assets/svgs/dotted-line.svg";
import WorkIcon from "assets/svgs/work.svg";

const Home = () => {
  return (
    <BaseLayout>
      {/* <section className="w-full px-3.5 py-24 lg:fit-x-bleed"> */}
      <section className="w-full">
        <section className="flex">
          <div className="basis-[75%] flex flex-col greylike py-10 pl-28 pr-12">
            <h2 className="text-primary-main font-extrabold text-2xl mb-8">
              Additional Services
            </h2>

            <section className="flex flex-col">
              <div className="accordion mb-6 rounded border-1 border-b-0 border-brand-input-200 hover:border-brand-secondary-100 box-shadow">
                <div className="accordion-header flex justify-between items-center px-6 py-4 cursor-pointer">
                  <p className="text-base font-semibold flex items-center gap-6">
                    icontitle
                  </p>
                </div>
                <div className="bg-brand-input-100 w-full overflow-hidden rounded-[3px]">
                  <div className={`bg-green-500 h-2 w-1/2`}></div>
                </div>
                {true && (
                  <div className="accordion-body p-10">
                    <h2>accordion body</h2>
                  </div>
                )}
              </div>
            </section>
          </div>
          <div className="basis-[25%] bg-white px-6 py-8">
            <IbeSidebar />
          </div>
        </section>
      </section>
    </BaseLayout>
  );
};

export default Home;
