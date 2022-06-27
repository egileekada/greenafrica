/* eslint-disable @next/next/no-img-element */
// import WheelIcon from "assets/wheel.svg";

import Link from "next/link";

const UpdateCard = ({ item, img = false }) => {
  const { id, title, meta_description, slug, image, created_at } = item;

  return (
    <section className="card__general">
      {img && (
        <figure>
          <img src={image} alt="images" />
        </figure>
      )}
      <div className="card__content">
        <div className="card-badge"> News </div>
        <h4>{title}</h4>
        <p>{meta_description}</p>
        <Link href={`/${slug}`}>
          <a>Read More</a>
        </Link>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <p>{created_at}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

UpdateCard.defaultProps = {
  item: {},
};

export default UpdateCard;
