/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import InfoIcon from "assets/svgs/info.svg";

const Tab2 = () => {
  const [search, setSearch] = useState({
    ref: "",
    surname: "",
  });

  const onChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const searchFlight = (e) => {
    e.preventDefault();
    const url = `https://book-flyaero.crane.aero/web/PNRSearch.xhtml?PNRNo=${search.ref}&surname=${search.surname}&language=en`;
    window.location.assign(url);
  };
  return (
    <>
      <p className="text-xl font-display text-[#656B7C] font-normal pt-5">
        Manager your upcoming trip.
      </p>
      <form onSubmit={searchFlight}>
        <div className="filter__check-in">
          <div className="basis-1/3 flex-grow mr-8">
            <div className="form-group icon">
              <label className="filter-label">Reference Number</label>
              <input
                type="text"
                id="ref"
                name="ref"
                className="filter-input-form"
                placeholder="Enter Booking Reference Number"
                value={search.ref}
                onChange={onChange}
                required
              ></input>
              <InfoIcon />
            </div>
          </div>
          <div className="basis-1/3 flex-grow mr-8">
            <div className="form-group">
              <label className="filter-label">Surname</label>
              <input
                type="text"
                id="surname"
                name="surname"
                className="filter-input-form"
                placeholder="Enter Surname"
                value={search.surname}
                onChange={onChange}
              ></input>
            </div>
          </div>
          <div className="basis-[15%] flex-shrink flex justify-end items-end">
            <button type="submit" className="btn btn-orange">
              Search
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Tab2;
