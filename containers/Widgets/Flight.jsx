/* eslint-disable @next/next/no-img-element */
import Popup from "components/Popup";
import { useSelector, useDispatch } from "react-redux";
import { generalSelector, hideWidget } from "redux/reducers/general";

const FlightWidget = () => {
  const { widgetVisible, sign } = useSelector(generalSelector);
  const dispatch = useDispatch();

  const handleUser = () => {
    window.location.assign("https://dev-website.gadevenv.com/");
  };

  return (
    <Popup
      display={widgetVisible}
      // closeModal={() => dispatch(hideWidget())}
      closeModal={handleUser}
      top={true}
      width="w-[600px]"
    >
      <section className="w-full bg-white rounded-xl ">
        <div className="flex flex-col items-center justify-center p-[50px]">
          <h6 className="font-display text-xl mb-5 text-red-400">
            Flight Search Error
          </h6>

          <p className="text-center font-body text-sm mb-6">
            Please check search terms and try again
          </p>
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-between w-full">
            <button onClick={handleUser} className="btn btn-primary basis-full">
              Go Back
            </button>
          </div>
        </div>
      </section>
    </Popup>
  );
};

export default FlightWidget;
