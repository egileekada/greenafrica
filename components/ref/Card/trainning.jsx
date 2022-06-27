/* eslint-disable @next/next/no-img-element */
// import WheelIcon from "assets/wheel.svg";

import { useRouter } from "next/router";

const TrainningCard = ({ item }) => {
  const router = useRouter();

  return (
    <section className="card__trainning">
      <figure>
        <img src="/images/man.png" alt="images" />
      </figure>
      <div className="flex flex-col">
        <h4>Fly around Nigeria safely using Aero</h4>
        <p>
          Healthy diet is important to maintaining healthy lifestyle, eating the
          right food.
        </p>

        <button
          onClick={() => router.push("/course")}
          className="btn btn-orange"
        >
          Register
        </button>
      </div>
    </section>
  );
};

TrainningCard.defaultProps = {
  item: {},
};

export default TrainningCard;
