const Passengers = ({
  passengers,
  setPassengers,
  infant,
  setInfant,
  adult,
  setAdult,
  child,
  setChild,
  setScreen,
}) => {
  const updateInfant = (value) => {
    if (infant >= 0) {
      setInfant(infant + value);
    }
  };

  const updateAdult = (value) => {
    if (adult >= 0) {
      setAdult(Math.min(adult + value, 9));
    }

    if (infant > 0) {
    }
  };

  const decreaseAdult = (value) => {
    if (adult >= 0) {
      setAdult(Math.min(adult + value, 9));
    }

    if (infant == adult) {
      setInfant(Math.min(infant + value, 9));
    }
  };

  const updateChild = (value) => {
    if (child >= 0) {
      setChild(Math.min(child + value, 9));
    }
  };

  return (
    <div
      className={`relative px-4 w-full h-full flex flex-col justify-start items-start gap-2 dark:bg-gray-700 bg-white`}
    >
      <p className="text-dark mt-6 ml-0 font-semibold px-4 text-base">
        Who’s travelling?
      </p>
      <div className="relative w-full">
        <div className="p-4 pt-0 space-y-6">
          <div className="grid grid-cols-2 mb-3">
            <div className="">
              <p className="text-base mb-1">Adults</p>
              <p className="mb-0 text-xs text-grey-nine">12 + years</p>
            </div>
            <div className="flex justify-end items-center">
              <div
                className="rounded-full bg-gray-200 w-[27px] h-[27px] flex px-2 cursor-pointer"
                role="button"
                disabled={passengers === 1}
                onClick={() => decreaseAdult(-1)}
              >
                <img src="/images/subtract.svg" alt="" />
              </div>
              <input
                type="tel"
                className="w-10 mx-2 rounded-lg text-center"
                value={adult}
                readOnly
              />
              <div
                className="rounded-full bg-gray-200 w-[27px] h-[27px] flex px-1 cursor-pointer"
                role="button"
                disabled={passengers === 9}
                onClick={() => updateAdult(1)}
              >
                <img src="/images/_add.svg" alt="" className="" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 mb-3">
            <div className="">
              <p className="text-base mb-1">Child</p>
              <p className="mb-0 text-xs text-grey-nine">2 - 12 years</p>
            </div>
            <div className="flex justify-end items-center">
              <div
                className="rounded-full bg-gray-200 w-[27px] h-[27px] flex px-2 cursor-pointer"
                role="button"
                disabled={child === 0}
                onClick={() => updateChild(-1)}
              >
                <img src="/images/subtract.svg" alt="subtract" />
              </div>
              <input
                type="tel"
                className="w-10 mx-2 rounded-lg text-center"
                value={child}
                readOnly
              />
              <div
                className="rounded-full bg-gray-200 w-[27px] h-[27px] flex px-1 cursor-pointer"
                role="button"
                disabled={passengers === 9}
                onClick={() => updateChild(1)}
              >
                <img src="/images/_add.svg" alt="" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 mb-3">
            <div className="">
              <p className="text-base mb-1">Infant</p>
              <p className="mb-0 text-xs text-grey-nine">0 - 2 years</p>
            </div>
            <div className="flex justify-end items-center">
              <div
                className="rounded-full bg-gray-200 w-[27px] h-[27px] flex px-2 cursor-pointer"
                role="button"
                disabled={infant === 0}
                onClick={() => updateInfant(-1)}
              >
                <img src="/images/subtract.svg" alt="" />
              </div>
              <input
                type="tel"
                className="w-10 mx-2 rounded-lg text-center"
                value={infant}
                readOnly
              />
              <div
                className="rounded-full bg-gray-200 w-[27px] h-[27px] flex px-1 cursor-pointer"
                role="button"
                disabled={adult == infant}
                onClick={() => updateInfant(1)}
              >
                <img src="/images/_add.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4">
        <button
          className="btn btn-primary w-full md:w-auto font-title block h-full"
          onClick={() => setScreen(5)}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Passengers;
