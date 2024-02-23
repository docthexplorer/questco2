import React, { useState, useEffect, useMemo, useCallback } from "react";

export default function Timer({ duration, displayOption }) {
  const [timerOut, setTimerOut] = useState(false);
  const [delayTime, setDelayTime] = useState(duration);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setDelayTime(delayTime - 1000);
    }, 1000);

    if (delayTime <= 1) {
      clearTimeout(timeoutID);
      setTimerOut(true);
    }
  }, [delayTime]);

  const getTimeFormat = useCallback((milliseconds) => {
    let totalSeconds = parseInt(Math.floor(milliseconds / 1000));
    let totalMinutes = parseInt(Math.floor(totalSeconds / 60));
    let totalHours = parseInt(Math.floor(totalMinutes / 60));

    let seconds = parseInt(totalSeconds % 60);
    let minutes = parseInt(totalMinutes % 60);
    let hours = parseInt(totalHours % 24);

    if (seconds < 10) seconds = `0${seconds}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (hours < 10) hours = `0${hours}`;

    return `${hours}: ${minutes}: ${seconds}`;
  }, []);

  const timeFormat = useMemo(
    () => getTimeFormat(delayTime),
    [delayTime, getTimeFormat]
  );

  return (
    <>
      {timerOut ? (
        <p className="timer-out">active</p>
      ) : (
        <div className="timer-container">
          <i className="fa-solid fa-hourglass-half hourglass-icon"></i>
          <p className="timer" style={{ display: displayOption }}>
            {timeFormat}
          </p>
        </div>
      )}
    </>
  );
}
