import React, {Component} from 'react';
import './Timer.css';

const formatTime = (timeLeftInSeconds) => {
    let minute = Math.floor(timeLeftInSeconds/60);
    if(minute <10 ) minute = '0' + minute;

    let second = timeLeftInSeconds - 60 * minute;
    if(second<10) second = '0' + second;

    return `${minute}:${second}`;

}

export default class Timer extends Component{
    render() {
        return(
            <div className='times'>
                <div className='times-content'>
                    <label id='timer-label'>{this.props.timeLabel}</label>
                    <span id='time-left'>{formatTime(this.props.timeLeftInSeconds)}</span>
                </div>
            </div>
        );
    }
}