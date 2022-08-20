/* eslint-disable @next/next/no-img-element */
import SelectIcon from "assets/svgs/select.svg";

const PassengerFormItem = ({ passenger, passengers, setPassengers }) => {
  const handleFieldChange = (e) => {
    let indexedPassenger = passengers.find(function (element) {
      return parseInt(element.id) === parseInt(passenger.id);
    });

    if (indexedPassenger) {
      const modifiedPassenger = {
        ...indexedPassenger,
        [e.target.name]: e.target.value,
      };

      let foundIndex = passengers
        .map(function (item) {
          return parseInt(item.id);
        })
        .indexOf(parseInt(modifiedPassenger.id));

      if (foundIndex > -1) {
        let oldPassengers = passengers;
        oldPassengers.splice(foundIndex, 1);
        const newPassArr = [...oldPassengers, modifiedPassenger].sort(
          (a, b) => {
            return a.id - b.id;
          }
        );
        setPassengers(newPassArr);
      }
    }
  };

  return (
    <div className="passenger__form__box">
      <h3 className="font font-header font-bold text-xxs mb-4">
        {passenger.type === "ADT"
          ? `ADULT ${passenger.typeCount}`
          : passenger.type === "CHD"
          ? `CHILD ${passenger.typeCount}`
          : `INFANT ${passenger.typeCount}`}
      </h3>

      <div className="mb-6 flex flex-wrap">
        <div className="form-group select-group mr-0 md:mr-4">
          <label>TITLE</label>
          <select id="title" name="title" onChange={handleFieldChange} required>
            <option value="">Select</option>
            <option value="Mrs">Mrs</option>
            <option value="Mr">Mr</option>
          </select>
          <div className="select-icon">
            <SelectIcon />
          </div>
        </div>

        <div className="form-group mr-0 md:mr-4">
          <label>FIRST NAME</label>
          <input
            type="text"
            placeholder="Enter first name"
            id="firstName"
            name="firstName"
            onChange={handleFieldChange}
            required
          />
        </div>
        <div className="form-group mr-0 md:mr-4">
          <label>LAST NAME</label>
          <input
            type="text"
            placeholder="Enter last name"
            id="lastName"
            name="lastName"
            onChange={handleFieldChange}
            required
          />
        </div>
        <div className="form-group">
          <label>DATE OF BIRTH</label>
          <input
            type="date"
            placeholder="Enter last name"
            id="dob"
            name="dob"
            onChange={handleFieldChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

PassengerFormItem.defaultProps = {
  passenger: "",
};

export default PassengerFormItem;
