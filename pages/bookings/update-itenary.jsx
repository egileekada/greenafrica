/* eslint-disable @next/next/no-img-element */
import BaseLayout from "layouts/Base";

const ManageUpdateItenary = () => {
  return (
    <BaseLayout>
      <section className="w-full">
        <section className="ga__section bg-normal">
          <div className="ga__section__main standalone">
            <h2 className="text-primary-main font-extrabold text-2xl mb-8 text-center">
              UPDATE ITENARY
            </h2>

            <section className="flex flex-col bg-white rounded-xl pb-12">
              <div className="flex items-center px-10">
                <button className="btn btn-outline mr-2">Go Back</button>
                <button className="btn btn-primary">Continue</button>
              </div>
            </section>
          </div>
        </section>
      </section>
    </BaseLayout>
  );
};

export default ManageUpdateItenary;
