import React from 'react';
import './App.scss';
import Timer from './Timer';
import TimerHooks from './TimerHooks';

const App: React.FC = () => {
    return (
      <div>
      <Timer />
      <TimerHooks />
      </div>
    );  
}

export default App;
