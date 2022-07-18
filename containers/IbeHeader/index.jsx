/* eslint-disable @next/next/no-img-element */
import ArrowTo from "assets/svgs/arrowto.svg";
import FlightIcon from "assets/svgs/flightcircle.svg";
import CaretLeft from "assets/svgs/caretleft.svg";
import CaretRight from "assets/svgs/caretright.svg";

const IbeHeader = () => {
  return (
    <section className="ibe__flight__info">
      <section className="ibe__flight__info__destination">
        <p>Lagos (LOS)</p>
        <figure>
          <ArrowTo />
        </figure>
        <p>Abuja (ABV)</p>

        <figure className="absolute -left-6">
          <FlightIcon />
        </figure>
      </section>
      <section className="ibe__flight__info__dates">
        <section className="flex items-center w-full">
          <button>
            <CaretLeft />
          </button>
          <section className="flex items-center w-full mx-4">
            <div className="ibe__date__item">
              <button>
                <h6>Sun, Jun 19</h6>
                <p>No Flights</p>
              </button>
            </div>
            <div className="ibe__date__item ">
              <button className="active">
                <h6>Sun, Jun 19</h6>
                <p>No Flights</p>
              </button>
            </div>
            <div className="ibe__date__item">
              <button>
                <h6>Sun, Jun 19</h6>
                <p>No Flights</p>
              </button>
            </div>
            <div className="ibe__date__item">
              <button>
                <h6>Sun, Jun 19</h6>
                <p>No Flights</p>
              </button>
            </div>
            <div className="ibe__date__item">
              <button>
                <h6>Sun, Jun 19</h6>
                <p>No Flights</p>
              </button>
            </div>
            <div className="ibe__date__item">
              <button>
                <h6>Sun, Jun 19</h6>
                <p>No Flights</p>
              </button>
            </div>
            <div className="ibe__date__item">
              <button>
                <h6>Sun, Jun 19</h6>
                <p>No Flights</p>
              </button>
            </div>
          </section>
          <button>
            <CaretRight />
          </button>
        </section>
      </section>
    </section>
  );
};

export default IbeHeader;
