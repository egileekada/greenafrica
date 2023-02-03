/* eslint-disable @next/next/no-img-element */
import Popup from "components/Popup";
import { useSelector, useDispatch } from "react-redux";
import { generalSelector, hideWidget } from "redux/reducers/general";
import DesktopFilter from "./DesktopFilter";
import CloseIcon from "assets/svgs/white-close.svg";

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
      flight={true}
      width="w-[90%]"
    >
      <div className="bg-white rounded-lg w-full">
        <div className="bg-[#26205E] rounded-t-lg flex justify-between  w-full p-5">
          <p className="text-white font-bold  text-xl">Change Flight</p>
            <span role="button" onClick={handleUser} className=" ">
              <CloseIcon />
            </span>
        </div>
        <div className="w-full">
          <div className="mx-auto ">
            <DesktopFilter />
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default FlightWidget;
