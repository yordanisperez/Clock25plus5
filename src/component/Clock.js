import {useState,useEffect,useRef} from 'react'
import ClockInit from './ClockInit'
import useClockfy from './clockify';
import './Clock.css'


function Clock(props){
    const [reset,setReset] =useState(false);
    const [startStop,setStartStop]=useState(false);
    const [timeClockBreak, setTimeClockBreak] = useState(5);
    const [timeClockSeccion, setTimeClockSeccion] = useState(25);
    const [activeClock,setActiveClock] =useState({activeClock:'Seccion',timer:timeClockSeccion});

    const clockfy=useClockfy(activeClock.timer);

    const audioRef=useRef();
  
  
  
    useEffect(() => {
            if (!reset){
                const interval = setInterval(() => 
                        {
                            if (!startStop)
                            {
                                setActiveClock((activeClock) =>{ 
                                    if (activeClock.timer){
                                        return {activeClock:activeClock.activeClock,timer:activeClock.timer-1}
                                    }
                                    audioRef.current.play();
                                    if (activeClock.activeClock==='Seccion') // Cambiamos a la proxima configuracion
                                        {
                                            return {activeClock:'Break',timer:timeClockBreak*60}
                                        }
                                    else{
                                        return {activeClock:'Seccion',timer:timeClockSeccion*60}
                                    }
                            }
                            
                        );}
                }, 1000);
            
                return () =>{ 
                    console.log("Se ha ejecutado la funcion de limpieza");
                    clearInterval(interval);
                    setReset(false);
                };
            }
       
      }, [reset,startStop]);

    /*Here is reset all value for default of both break and seccion  */ 
function resetHandle(){
    audioRef.current.pause();
    audioRef.current.currentTime=0;
    setTimeClockBreak(5);
    setTimeClockSeccion(25);
    setActiveClock({activeClock:'Seccion',timer:25*60})
    setReset(true);
    setStartStop(true);

}

function startStopHandle(){
    audioRef.current.pause();
    audioRef.current.currentTime=0;
    setStartStop(!startStop);
}

function upDateBreakHandle(value){
    setTimeClockBreak(value);
    if (activeClock.activeClock==='Break')
    {
        setActiveClock((activeClock)=>{
            return {activeClock:'Break',timer:value*60}
        })
    }
}

function upDateSeccionHandle(value){
    setTimeClockSeccion(value);
    if (activeClock.activeClock==='Seccion')
    {
        setActiveClock((activeClock)=>{
            return {activeClock:'Seccion',timer:value*60}
        })
    }

}

    return (
      <div>
        <div className={"clock-config"}>
          <ClockInit
            id="break-label"
            label="Break Length"
            labelBtnDecrem="break-decrement"
            labelBtnInc="break-increment"
            time={timeClockBreak}
            idTimer="break-length"
            setTime={upDateBreakHandle}
            reset={reset}
            setReset={setReset}
            runing={!startStop}
          ></ClockInit>
          <ClockInit
            id="session-label"
            label="Seccion Length"
            labelBtnDecrem="session-decrement"
            labelBtnInc="session-increment"
            time={timeClockSeccion}
            idTimer="session-length"
            setTime={upDateSeccionHandle}
            reset={reset}
            setReset={setReset}
            runing={!startStop}
          ></ClockInit>
        </div>
        <div className={'clock'}>
          <div id="timer-label">{activeClock.activeClock}</div>
          <div id="time-left" style={clockfy==='00:00'?{color:'red'}:{color:'black'}}>{clockfy}</div>
          <div className={'clock-btn'}>
            <button id="start_stop" onClick={startStopHandle}>
                <i className={startStop?"fa fa-play fa-2x":"fa fa-pause fa-2x"}></i>
            </button>
            <button id="reset" onClick={resetHandle}><i className="fa fa-refresh fa-2x"></i></button>
          </div>
          <audio
            id="beep"
            preload="auto"
            ref={audioRef}
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          />
        </div>
      </div>
    );
}

export default Clock;