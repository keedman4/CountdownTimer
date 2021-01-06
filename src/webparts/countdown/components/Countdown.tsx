import * as React from 'react';
import Clock from './count/CountDown';
import { ICountdownProps } from './ICountdownProps';
import { escape } from '@microsoft/sp-lodash-subset';
import style from './axa.module.scss';
import Countdown from "react-countdown";

export default class Timer extends React.Component<ICountdownProps, {}> {
  public render(): React.ReactElement<ICountdownProps> {
    let odisplayValue:any = "";
    
    if(this.props.idatetime==null) {
      odisplayValue = "2018-12-25";
    } else {
      odisplayValue=this.props.idatetime.displayValue;
    }
    return (
      // <Timer />

      <div className={style.timer}>
      <div className={style.timerText}>
          <p>
          {escape(this.props.description)}
          </p>
      </div>
      <div className={style.timerValue}> 
    
      {/* <Countdown date={Date.now() + 500000}/> */}
      <Clock deadline={odisplayValue} />
      </div>
      </div>
    );
  }
}
