import React, { useState } from 'react';
import Stopwatch from './Stopwatch';
import './StopWatch.css'; // Ensure you import your CSS file

function StopwatchesContainer() {
    const [lapTimes, setLapTimes] = useState([]);

    const handleLap = (lapTime) => {
        setLapTimes([...lapTimes, lapTime]);
    };

    return (
        <div>
            <Stopwatch onLap={handleLap} />
            <div style={{ marginTop: '50px' }}>
                <Stopwatch laps={lapTimes} isLapStopwatch />
            </div>
        </div>
    );
}

export default StopwatchesContainer;
