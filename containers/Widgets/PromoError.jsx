/* eslint-disable @next/next/no-img-element */
import Popup from "components/Popup";
import { useSelector, useDispatch } from "react-redux";
import {
  generalSelector,
  showWidget,
  setPromoWidgetVisible,
} from "redux/reducers/general";

const PromoErrorWidget = () => {
  const { promoWidgetVisible } = useSelector(generalSelector);
  const dispatch = useDispatch();

  const handleUser = () => {
    dispatch(setPromoWidgetVisible(false));
    dispatch(showWidget(true));
  };
  return (
    <Popup
      display={promoWidgetVisible}
      closeModal={() => dispatch(hideWidget())}
      top={true}
      width="w-[600px]"
    >
      <section className="w-full bg-white rounded-xl ">
        <div className="flex flex-col items-center justify-center p-[50px]">
          <h6 className="font-display text-xl mb-5 text-red-400">
            PromoCode Error
          </h6>

          <p className="text-center font-body text-sm mb-6">
            The promo code you provided is invalid.
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

export default PromoErrorWidget;
