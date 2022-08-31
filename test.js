let _formIsInValid = false;

const passengers = [
  {
    c_code: "+234",
    c_title: "",
  },

  {
    c_code: "+234",
    c_title: "fffjjjff",
  },
];

passengers.map((_pax) => {
  for (const key in _pax) {
    if (_pax[key].length < 1) {
      _formIsInValid = true;
    }
  }
});

console.log(` form is invalid ${_formIsInValid}`);
