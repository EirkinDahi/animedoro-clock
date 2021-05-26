import React,{ Component } from 'react';
import './App.css';
import Timer from './components/Timer'
import Controller from './components/Controller';
import Settings from './components/Settings';

export default class App extends Component{
  constructor(props){
    super(props);

    this.state={
      sessionLength: Number.parseInt(this.props.defaultSessionLength,10),
      timeLabel:'Session',
      timeLeftInSeconds: Number.parseInt(this.props.defaultSessionLength,10)*60,
      isStart: false,
      timeInterval: null
    }

    this.onIncreaseSession = this.onIncreaseSession.bind(this);
    this.onDecreaseSession = this.onDecreaseSession.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onStartStop = this.onStartStop.bind(this);
    this.decreaseTimer = this.decreaseTimer.bind(this);
    this.phaseControl = this.phaseControl.bind(this);
  }

  onDecreaseSession(){
    if(this.state.sessionLength>1 && !this.state.isStart){
      this.setState({
        sessionLength: this.state.sessionLength-1,
        timeLeftInSeconds: (this.state.sessionLength-1)*60
      });
    }
    console.log(this.state.sessionLength);
  }

  onIncreaseSession(){
    if(this.state.sessionLength < 60 && !this.state.isStart){
      this.setState({
        sessionLength: this.state.sessionLength+1,
        timeLeftInSeconds: (this.state.sessionLength+1)*60
      });
    }
  }

  onReset(){
    this.setState({
      sessionLength: Number.parseInt(this.props.defaultSessionLength, 10),
      timeLabel: 'Session',
      timeLeftInSeconds: Number.parseInt(this.props.defaultSessionLength, 10) * 60,
      isStart: false,
      timerInterval: null
    });
    this.state.timerInterval && clearInterval(this.state.timerInterval);
  }

  onStartStop() {
    if (!this.state.isStart) {
      this.setState({
        isStart: !this.state.isStart,
        timerInterval: setInterval(() => {
          this.decreaseTimer();
          this.phaseControl();
        }, 1000)
      })
    } else {
      this.state.timerInterval && clearInterval(this.state.timerInterval);

      this.setState({
        isStart: !this.state.isStart,
        timerInterval: null
      });
    }
  }

  decreaseTimer() {
    this.setState({
      timeLeftInSeconds: this.state.timeLeftInSeconds - 1
    });
  }

  phaseControl() {
    if (this.state.timeLeftInSeconds === -1) {
      if (this.state.timeLabel === 'Session') {
        this.setState({
          timeLabel: 'Break Time! Go watch that episode :)',
          timeLeftInSeconds: this.state.breakLength * 60 
        });
      } else {
        this.setState({
          timeLabel: 'Session',
          timeLeftInSeconds: this.state.sessionLength * 60
        });
      }
    }
  }

  render() {
    return (
      <div className="animedoro-clock">
        <div className="animedoro-clock-header">
          <h1 className="animedoro-clock-header-name">Animedoro Clock</h1>
        </div>

        <Settings
          sessionLength={this.state.sessionLength}
          isStart={this.state.isStart}
          onDecreaseSession={this.onDecreaseSession}
          onIncreaseSession={this.onIncreaseSession}
        />
      

        <Timer
          timeLabel={this.state.timeLabel}
          timeLeftInSeconds={this.state.timeLeftInSeconds}
        />

        <Controller
          onReset={this.onReset}
          onStartStop={this.onStartStop}
          isStart={this.state.isStart}
        />

    
      </div>
    );
  }
    
}


