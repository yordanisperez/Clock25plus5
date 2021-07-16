import './ClockInit.css'

function ClockInit(props){
 

   
function decremHandle(){
    if (!props.runing) {
      if (props.time > 1) props.setTime(props.time - 1);
      else props.setTime(1);
    }
}

function incHandle(){
    if (props.time < 60) {
      if (!props.runing) {
        props.setTime(props.time + 1);
      }
    }
}

    return <div className={'block-config'} >
            <div id={props.id}>{props.label}</div>
            <div className={'block-config-btn'}>
                <button  id={props.labelBtnDecrem} onClick={decremHandle}><i className ={"fa fa-arrow-down fa-2x"}></i></button>
                <button id={props.labelBtnInc} onClick={incHandle}><i className={"fa fa-arrow-up fa-2x"}> </i></button>
            </div>
            <div id ={props.idTimer}>{props.time}</div>
    </div>
}

export default ClockInit;