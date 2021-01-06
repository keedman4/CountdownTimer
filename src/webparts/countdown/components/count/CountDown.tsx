import React from "react";
import Countdown from "react-countdown";
import style from '../axa.module.scss';
import { ICountdownProps } from '../ICountdownProps'
import IClockstate from './IClockState';

export default class Clock extends React.Component<any,IClockstate> {

    public constructor(props: ICountdownProps) {
        super(props);
        this.state = {
            idays:0,
            ihours:0,
            iminutes:0,
            iseconds:0
        };
    }

    public componentWillMount() {
        //TODO get from webpart configuration
        this.getTimeUntil(this.props.deadline);
    }

    public componentDidMount(){
        setInterval(()=>this.getTimeUntil(this.props.deadline));
    }

    public leading0(num) {
        return num < 10 ? '0' + num: num ;
    }

    private getTimeUntil(deadline){
         const time = Date.parse(deadline) - Date.now();
        const seconds = Math.floor((time/1000) % 60);
        const minutes = Math.floor((time/1000/60) % 60);
        const hours = Math.floor((time/(1000*60*60)) % 24);
        const days = Math.floor((time/(1000*60*60*24)));

        this.setState({idays:days,ihours:hours,iminutes:minutes,iseconds:seconds});
    }

    public render(){

        return(
            <div>
                <div>
                    <div className={style.days}>
                        <span >{this.leading0(this.state.idays)}</span>
                        <div>days</div>
                    </div>
                    <div className={style.days}>
                        <span>{this.leading0(this.state.ihours)} </span>
                        <div>hrs</div>
                    </div>
                    <div className={style.days}>
                        <span>{this.leading0(this.state.iminutes)} </span>
                        <div>min</div>
                    </div>
                    <div className={style.days}>
                        <span>{this.leading0(this.state.iseconds)} </span>
                        <div>sec</div>
                    </div>
                </div>
            </div>
        );
    }
}













// const Timer = () => {
//     return(
//         <div className={style.timer}>
//         <div className={style.timerText}>
//             <p>
//                 NEXT BIG EVENT BEGINS IN
//             </p>
//         </div>
//         <div className={style.timerValue}> 
      
//         {/* <Countdown date={Date.now() + 500000}/> */}
       
//         </div>
//         </div>
        
//     );
// }
// export default Timer;