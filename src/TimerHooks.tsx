import React, { useState, useEffect } from "react";
import moment from "moment";

const initSeconds = 1200;

const TimerHooks: React.FC = () => {
  const [seconds, setSeconds] = useState(initSeconds);
  const [running, setRunning] = useState(false);
  
  const time = moment.duration(seconds, 'seconds');

  useEffect(() => {
    let interval: any = null;
    if (running) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (!running && seconds !== 0) {
      clearInterval(interval)
    }

    return () => clearInterval(interval);
  }, [running, seconds]);

  function toggleRunning() {
    running ? setRunning(false) : setRunning(true);
  }

  function startTimer() {
    toggleRunning();
    setSeconds(seconds - 1);
  }

  function resetTimer() {
    setRunning(false);
    setSeconds(initSeconds);
  }

  function disableSubtract(): boolean {
    if (time.get('minutes') <= 0) {
        return true;
        }
    return false; 
  }

  function disablePlay(): boolean {
      if (running) {
          return true;
      }
      return false;
  }

  function disableStop(): boolean {
      if (!running) {
          return true;
      }
      return false;
  }

    function formatMMSS(val: any): any {
        return val < 10 ? '0' + val : val
    }

  return (
        <div className="container m-5">
          <h4>Hooks-Based React</h4>
        <div className="timer-wrapper">
          <button className="col-xs-1 btn btn-primary" onClick={() => setSeconds(seconds + 60)}> + </button>
          <div className="col-xs-1">TIME: {formatMMSS(time.get('minutes'))}:{formatMMSS(time.get('seconds'))}</div>
          <button className="col-xs-1 btn btn-primary"  onClick={() => setSeconds(seconds - 60)} disabled={disableSubtract()}> - </button>
          <button className="col-xs-1 btn btn-success" onClick={ () => startTimer()} disabled={disablePlay()} >PLAY</button>
          <button className="col-xs-1 btn btn-danger" onClick={ () => toggleRunning()} disabled={disableStop()}>STOP</button>
          <button className="col-xs-1 btn btn-warning" onClick={ () => resetTimer() }>RESET</button>
        </div>
    </div>
    );
};

export default TimerHooks;
