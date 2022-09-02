/* eslint-disable @next/next/no-img-element */
import Popup from "components/Popup";
import { useSelector, useDispatch } from "react-redux";
import { generalSelector, hideWidget } from "redux/reducers/general";
import DesktopFilter from "./DesktopFilter";

const FlightWidget = () => {
  const { widgetVisible } = useSelector(generalSelector);
  const dispatch = useDispatch();

  const handleUser = () => {
    dispatch(hideWidget());
    // window.location.assign("https://dev-website.gadevenv.com/");
  };

  return (
    <Popup
      display={widgetVisible}
      closeModal={handleUser}
      top={true}
      width="w-[80%]"
    >
      <div className="bg-white rounded-lg w-full overflow-idden">
        <div className="bg-[#26205E] w-full p-5">
          <p className="text-white text-xl">Change Flight</p>
        </div>
        <div className="w-full relative">
          <div className="mx-auto">
            <DesktopFilter />
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default FlightWidget;
