/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import InfoIcon from "assets/svgs/info.svg";

const MobileTab2 = () => {
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
    <form onSubmit={searchFlight}>
      <div className="mobile__check-in">
        <div className="basis-full flex-grow mb-6">
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
        <div className="basis-full flex-grow mb-6">
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
        <div className="basis-full mobile__cta">
          <button type="submit" className="mt-4 btn btn-orange w-full">
            <span> Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default MobileTab2;
