import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { useIdleTimer, workerTimers } from "react-idle-timer";
import { resetStore } from "redux/store";

function IdleMonitor() {
  const [idleModal, setIdleModal] = useState(false);

  const [remaining, setRemaining] = useState(0);

  const timeout = 1000 * 60 * 15;
  const promptTimeout = 1000 * 60;

  const onPrompt = () => {
    setIdleModal(true);
    setRemaining(promptTimeout);
  };

  const onIdle = () => {
    setIdleModal(false);
    setRemaining(0);
    resetStore();

    window.location.assign("https://dev-website.gadevenv.com/");
  };

  const onActive = () => {
    setIdleModal(false);
    setRemaining(0);
  };

  const handleStillHere = () => {
    setIdleModal(false);
    activate();
  };

  const { getRemainingTime, isPrompted, activate } = useIdleTimer({
    timers: workerTimers,
    timeout,
    promptTimeout,
    onPrompt,
    onIdle,
    onActive,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPrompted()) {
        setRemaining(Math.ceil(getRemainingTime() / 1000));
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [getRemainingTime, isPrompted]);

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
          Your session will expire in {remaining} seconds. Do you want to extend
          the session?
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          <button
            onClick={() => onIdle()}
            className="btn btn-primary w-full md:basis-auto my-10 md:mb-0 mx-auto"
          >
            Logout
          </button>

          <button
            onClick={() => handleStillHere()}
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
