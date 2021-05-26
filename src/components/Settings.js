import React,{Component} from 'react';
import './Settings.css';

export default class Settings extends Component{
    render(){
        const buttonClassName = this.props.isStart ? 'disable' : '';
        return(
            <div className='settings'>
                <div className='settings-section'>
                    <label id="session-label">Session Time</label>
                    <div>
                        <button className={buttonClassName} id='session-decrement' onClick={this.props.onDecreaseSession}>-</button>
                        <span id='session-length'>{this.props.sessionLength}</span>
                        <button className={buttonClassName} id='session-increment' onClick={this.props.onIncreaseSession}>+</button>
                    </div>
                </div>
            </div>
        )
    }
}