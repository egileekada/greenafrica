/* eslint-disable @next/next/no-img-element */
import create from "@ant-design/icons/lib/components/IconFont";
import CircleIcon from "assets/svgs/circle.svg";
import MarkIcon from "assets/svgs/mark.svg";
import Link from "next/link";

const CareerCard = ({ item }) => {
  const { createdAt, title, type, location, excerpt,slug } = item;
  return (
    <section className="card__career">
      <p className="time">{createdAt}</p>
      <h2 className="w-[85%]">{title}</h2>
      <div className="flex items-center mb-4">
        <div className="flex items-center mr-4">
          <MarkIcon className="mr-2" />
          <p className="location">{location}</p>
        </div>
        <div className="flex items-center">
          <CircleIcon className="mr-2" />
          <p className="location">{type}</p>
        </div>
      </div>
      <div className="flex flex-col mb-4">
        <h5 className="text-black font-extrabold text-sm mb-3"> Summary:</h5>
        <p className="text-[#3B3A40]">{excerpt}</p>
      </div>
      <Link href={`/careers/${slug}`}>
        <a className="text-primary-main  font-bold hover:text-primary-main  hover:text-opacity-70">
          More Details
        </a>
      </Link>
    </section>
  );
};

CareerCard.defaultProps = {
  item: {},
};

export default CareerCard;
