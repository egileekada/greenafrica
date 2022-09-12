/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";

const Home = () => {
  return (
    <BaseLayout>
      <section className="w-full checkin">
        <section className="">
          <div className="ga__section__main">
            <div className="mb-8 pt-16 xlg:mt-0 h-[300px] text-center">
              <h2 className="text-black text-3xl mb-2">Multiple Tab Alert</h2>
              <p className="text-xl">
                Use of multiple tabs is not supported. Please close all tabs
                except one.
              </p>
            </div>
          </div>
        </section>
      </section>
    </BaseLayout>
  );
};

export default Home;
