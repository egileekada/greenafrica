/* eslint-disable @next/next/no-img-element */
import Popup from "components/Popup";
import { useSelector, useDispatch } from "react-redux";
import { generalSelector, hideWidget } from "redux/reducers/general";

const FlightWidget = () => {
  const { widgetVisible } = useSelector(generalSelector);
  const dispatch = useDispatch();

  return (
    <Popup
      display={widgetVisible}
      closeModal={() => dispatch(hideWidget())}
      top={true}
      width="w-[600px]"
    >
      <section className="w-full bg-white rounded-xl ">
        <div className="flex flex-col items-center justify-center p-[50px]">
          <h6 className="font-display text-xl mb-5">
            This is the new flight widget?
          </h6>

          <p className="text-center font-body text-sm mb-6">
            THis will hold the new flight widget
          </p>
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-between w-full">
            <button className="btn btn-primary basis-full lg:basis-[48%] lg:mr-2">
              Yes, I need more time
            </button>
            <button className="btn btn-outline basis-full lg:basis-[48%]">
              I don’t need it
            </button>
          </div>
        </div>
      </section>
    </Popup>
  );
};

export default FlightWidget;
