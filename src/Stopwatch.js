import { useState, useEffect } from 'react';

function StopWatch() {
    const [time1, setTime1] = useState(0);
    const [time2, setTime2] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        let intervalId1;
        let intervalId2;
        if (isRunning) {
            intervalId1 = setInterval(() => setTime1(prevTime => prevTime + 1), 10);
            intervalId2 = setInterval(() => setTime2(prevTime => prevTime + 1), 10);
        }
        return () => {
            clearInterval(intervalId1);
            clearInterval(intervalId2);
        };
    }, [isRunning]);

    // Method to start and stop both timers
    const startAndStop = () => {
        setIsRunning(!isRunning);
    };

    // Method to reset both timers
    const reset = () => {
        setTime1(0);
        setTime2(0);
        setLaps([]);
    };

    // Method to add a lap
    const addLap = () => {
        const currentLapTime = time1 - (laps.length > 0 ? laps[laps.length - 1].totalTime : 0);
        setLaps([...laps, { lapTime: currentLapTime, totalTime: time1 }]);
        setTime2(0); // Reset the second stopwatch when a lap is added
    };

    // Formatting time for display
    const formatTime = (time) => {
        const hours = Math.floor(time / 360000);
        const minutes = Math.floor((time % 360000) / 6000);
        const seconds = Math.floor((time % 6000) / 100);
        const milliseconds = time % 100;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
    };

    return (
        <>
            <center>
                <h1 className='my-4'>StopWatch</h1>
                <div className="stopwatch-container">
                    <p className="stopwatch-time">
                        {formatTime(time1)}
                    </p>
                    <p className="stopwatch-time-2">
                        {formatTime(time2)}
                    </p>
                    <div className="stopwatch-buttons">
                        <button className="stopwatch-button btn btn-primary btn-lg mx-4 my-4 px-5 rounded-pill" onClick={startAndStop}>
                            {isRunning ? "Stop" : "Start"}
                        </button>
                        <button className="stopwatch-button btn btn-secondary btn-lg mx-4 my-4 px-5 rounded-pill" onClick={reset}>
                            Reset
                        </button>
                        <button className="stopwatch-button btn btn-secondary btn-lg mx-4 my-4 px-5 rounded-pill" onClick={addLap} disabled={!isRunning}>
                            Lap
                        </button>
                    </div>
                    {laps.length > 0 && (
                        <div className="laps-container">
                            <h2>Laps</h2>
                            <div className="laps-table-container">
                                <table className="laps-table table table-dark table-striped">
                                    <thead>
                                        <tr>
                                            <th>Lap No.</th>
                                            <th>Lap Time</th>
                                            <th>Total Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...laps].reverse().map((lap, index) => (
                                            <tr key={index}>
                                                <td>{laps.length - index}</td>
                                                <td>{formatTime(lap.lapTime)}</td>
                                                <td>{formatTime(lap.totalTime)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </center>
        </>
    );
}

export default StopWatch;
