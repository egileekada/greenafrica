/* eslint-disable @next/next/no-img-element */
// import WheelIcon from "assets/wheel.svg";

import Link from "next/link";
import moment from "moment";


const GeneralCard = ({ item, img = false }) => {
  return (
    <section className="card__general">
      {img && (
        <figure>
          <img src={item?.image || "/images/straight.png"} alt="images" />
        </figure>
      )}
      <div className="card__content">
        <div className="card-badge"> {item?.category?.name} </div>
        <h4>{item?.title}</h4>
        {/* <p>
          Healthy diet is important to maintaining healthy lifestyle, eating the
          right food.
        </p> */}
        <Link href={item?.slug || "/"}>
          <a>Read More</a>
        </Link>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <p>{moment(item?.createdAt).fromNow()}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

GeneralCard.defaultProps = {
  item: {},
};

export default GeneralCard;
