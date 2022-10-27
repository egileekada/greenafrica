import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { resetStore } from "redux/store";

function IdleMonitor() {
  //Modal
  const [idleModal, setIdleModal] = useState(false);

  let idleTimeout = 1000 * 60 * 15; //15 minute
  let idleLogout = 1000 * 60 * 2; //2 Minutes
  let idleEvent;
  let idleLogoutEvent;

  /**
   * Add any other events listeners here
   */
  const events = ["mousemove", "click", "keypress"];

  /**
   * @method logOut
   * This function will destroy current user session.
   */

  const logOut = () => {
    setIdleModal(false);
    resetStore();
    window.location.assign("https://dev-website.gadevenv.com/");
  };

  /**
   * @method sessionTimeout
   * This function is called with each event listener to set a timeout or clear a timeout.
   */
  const sessionTimeout = () => {
    if (!!idleEvent) clearTimeout(idleEvent);
    if (!!idleLogoutEvent) clearTimeout(idleLogoutEvent);

    idleEvent = setTimeout(() => setIdleModal(true), idleTimeout); //show session warning modal.
    idleLogoutEvent = setTimeout(() => logOut(), idleLogout); //Call logged out on session expire.
  };

  /**
   * @method extendSession
   * This function will extend current user session.
   */
  const extendSession = () => {
    setIdleModal(false);
    sessionTimeout();
  };

  useEffect(() => {
    for (let e in events) {
      window.addEventListener(events[e], sessionTimeout);
    }

    return () => {
      for (let e in events) {
        window.removeEventListener(events[e], sessionTimeout);
      }
    };
  }, []);

  return (
    <Modal
      className="modalStyle"
      visible={idleModal}
      title="Session expire warning"
      footer={null}
      onCancel={() => setIdleModal(false)}
    >
      <div className="px-5 pb-5 pt-10 text-center">
        <h1 className="text-lg font-normal mb-5">
          {" "}
          Your session will expire in {idleLogout / 60 / 1000} minutes. Do you
          want to extend the session?
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          <button
            onClick={() => logOut()}
            className="btn btn-primary w-full md:basis-auto my-10 md:mb-0 mx-auto"
          >
            Logout
          </button>

          <button
            onClick={() => extendSession()}
            className="btn btn-outline w-full md:basis-auto my-10 md:mb-0 mx-auto"
          >
            Extend session
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default IdleMonitor;
