import React, { useEffect } from "react";
import BaseLayout from "layouts/Base";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";

import { retrieveBookingFromState } from "redux/reducers/session";
import CloseIcon from "assets/svgs/close.svg";
import CheckIcon from "assets/svgs/check_success.svg";
import HoverboardIcon from "assets/svgs/hoverboard.svg";
import ScissorsIcon from "assets/svgs/scissors.svg";
import GunIcon from "assets/svgs/gun.svg";
import BatteryIcon from "assets/svgs/battery.svg";
import CigaretteIcon from "assets/svgs/cigarette.svg";
import CarBatteryIcon from "assets/svgs/car_battery.svg";

const Consent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const {
  //   query: { signature },
  // } = router;

  useEffect(() => {
    dispatch(retrieveBookingFromState());
  }, []);

  const data = [
    {
      title: (
        <>
          <HoverboardIcon className="inline mr-2" /> Self-Balancing Devices{" "}
        </>
      ),
      checkedBaggage: <CloseIcon className="mx-auto" />,
      handBaggage: <CloseIcon className="mx-auto" />,
    },
    {
      title: (
        <>
          <ScissorsIcon className="inline mr-2" /> Pointed, edged or blunt tools{" "}
        </>
      ),
      checkedBaggage: <CheckIcon className="mx-auto" />,
      handBaggage: <CloseIcon className="mx-auto" />,
    },
    {
      title: (
        <>
          <GunIcon className="inline mr-2" /> Firearms (If approved){" "}
        </>
      ),
      checkedBaggage: <CheckIcon className="mx-auto" />,
      handBaggage: <CloseIcon className="mx-auto" />,
    },
    {
      title: (
        <>
          <BatteryIcon className="inline mr-2" />
          Spare Batteries
        </>
      ),
      checkedBaggage: <CloseIcon className="mx-auto" />,
      handBaggage: <CheckIcon className="mx-auto" />,
    },
    {
      title: (
        <>
          <CigaretteIcon className="inline mr-2" /> E-cigarettes
        </>
      ),
      checkedBaggage: <CloseIcon className="mx-auto" />,
      handBaggage: <CheckIcon className="mx-auto" />,
    },
    {
      title: (
        <>
          <CarBatteryIcon className="inline mr-2" /> Electronic Devices & Spare
          Batteries {">"} 16OWh
        </>
      ),
      checkedBaggage: <CloseIcon className="mx-auto" />,
      handBaggage: <CloseIcon className="mx-auto" />,
    },
  ];

  return (
    <BaseLayout>
      <div className="w-full px-3.5 py-10 lg:fit-x-bleed bg-[#fff]">
        <div className="container mx-auto my-10">
          <h1 className="text-3xl font-semibold mb-4">
            Agree to Check In Terms & Conditions
          </h1>
          <p className="text-lg font-light">
            Ensure you are complying with our Baggage Policy
          </p>

          <div className="relative overflow-auto mt-10">
            <div class="overflow-x-auto relative rounded-lg">
              <table class="text-sm text-left text-dark border-collapse w-full">
                <thead class="text-lg text-dark">
                  <tr className="">
                    <th
                      scope="col"
                      class="p-6 border-r border-b border-[#000000] border-opacity-10"
                    >
                      Items
                    </th>
                    <th
                      scope="col"
                      class="p-6 border-r border-b border-[#000000] border-opacity-10 text-center"
                    >
                      Checked Baggage
                    </th>
                    <th
                      scope="col"
                      class="p-6 border-b border-[#000000] border-opacity-10 text-center"
                    >
                      Hand Baggage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      class="border-b border-[#000000] border-opacity-10 last:border-b-0"
                    >
                      <th
                        scope="row"
                        class="p-6 font-medium text-dark whitespace-nowrap border-r border-[#000000] border-opacity-10"
                      >
                        {item.title}
                      </th>

                      <td class="p-6 border-r last:border-r-0 border-[#000000] border-opacity-10">
                        {item.checkedBaggage}
                      </td>

                      <td class="p-6 border-r last:border-r-0 border-[#000000] border-opacity-10">
                        {item.handBaggage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div class="absolute inset-0 pointer-events-none border border-[#000000] border-opacity-10 rounded-xl"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-10 mt-10">
            <button
              onClick={() => router.back()}
              className="btn btn-outline text-center my-2"
            >
              Go Back
            </button>
            <Link
              href={{
                pathname: "/checkin/manage-services",
                query: { terms: true },
              }}
            >
              <a className="btn btn-primary text-center my-2">Accept Terms</a>
            </Link>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Consent;
