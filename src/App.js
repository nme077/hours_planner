import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: '',
      year: '',
      numOfWeekdays: '',
      numOfWorkdays: 0,
      numHoursRemaining: 0,
      dailyHoursRemaining: '0.00',
      numOfDaysOff: 0,
      numOfDaysElapsed: 0,
      numfOfHoursElapsed: 0,
      goal: 0
    }
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];

    const currentMonthNum = new Date().getMonth();
    const currentMonthText = monthArray[currentMonthNum]
    const currentYear = new Date().getFullYear();
    const numOfWeekdays = this.getWeekdaysInMonth(currentMonthNum, new Date().getFullYear());

    this.setState({
      month: currentMonthText,
      year: currentYear,
      numOfWeekdays,
      numOfWorkdays: numOfWeekdays
    });
  }

  getWeekdaysInMonth = (month, year) => {
    const numOfDays = this.numDaysInMonth(month, year);
    let weekdays = 0;

    for(let i = 0; i < numOfDays; i++) {
      if(this.isWeekday(year, month, i+1)) {
        weekdays++;
      }
    }
    return weekdays;
  }

  isWeekday = (year, month, day) => {
    const dayNum = new Date(year, month, day).getDay();

    return dayNum !== 0 && dayNum !== 6;
  }

  numDaysInMonth = (month, year) => {
    return 32 - new Date(year, month, 32).getDate();
  }

  handleDaysOffInput = (e) => {
    const weekdays = this.state.numOfWeekdays;
    const numOfWorkdays = weekdays - e.target.value

    if(e.target.value <= weekdays && e.target.value >= 0) {
      this.setState({
        numOfDaysOff: e.target.value,
        numOfWorkdays
      });
      this.updateDailyHoursRemaining(this.state.numHoursRemaining, numOfWorkdays, this.state.numOfDaysElapsed);
    }
  }

  handleDaysElapsed = (e) => {
    const workdays = this.state.numOfWorkdays;

    if(e.target.value <= workdays && e.target.value >= 0) {
      this.setState({
        numOfDaysElapsed: e.target.value
      })
      this.updateDailyHoursRemaining(this.state.numHoursRemaining, workdays, e.target.value);
    }
  }

  handleNumfOfHoursElapsed = (e) => {
    if(e.target.value >= 0) {
      const numHoursRemaining = this.state.goal - e.target.value;
      this.setState({
        numfOfHoursElapsed: e.target.value,
        numHoursRemaining
      })
      this.updateDailyHoursRemaining(numHoursRemaining, this.state.numOfWorkdays, this.state.numOfDaysElapsed);
    }
  }

  handleGoal = (e) => {
    if(e.target.value >= 0) {
      const numHoursRemaining = e.target.value - this.state.numfOfHoursElapsed;
      
      this.setState({
        goal: e.target.value,
        numHoursRemaining
      })
      this.updateDailyHoursRemaining(numHoursRemaining, this.state.numOfWorkdays, this.state.numOfDaysElapsed);
    }
  }

  updateDailyHoursRemaining = (numHoursRemaining, numOfWorkdays, numOfDaysElapsed) => {
    // hours remaining divided by (workdays - workdays elapsed)
    const dailyHoursRemaining = (numHoursRemaining / (numOfWorkdays - numOfDaysElapsed)).toFixed(2);
    this.setState({
      dailyHoursRemaining
    })
  }

  render() {
    return (
      <div className="App min-vh-100 min-vw-100 d-flex align-items-center justify-content-center bg-secondary bg-gradient text-white">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-3">
              <h1 className="fs-1">{this.state.month} {this.state.year} Chargeable Hours Goal</h1>
            </div>
          </div>
          <div className="row justify-content-between fs-5">
            <div className="col-md-3 col-sm-12">
              <div className="mb-3 text-start">
                <label htmlFor="monthlyGoal" className="form-label">Chargeable hours goal</label>
                <input type="number" className="form-control" id="monthlyGoal" onChange={this.handleGoal} value={this.state.goal} />
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="daysOffInput" className="form-label">PTO/Holidays</label>
                <input type="number" className="form-control" id="daysOffInput" onChange={this.handleDaysOffInput} value={this.state.numOfDaysOff} />
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="daysElapsed" className="form-label">Workdays elapsed</label>
                <input type="number" className="form-control" id="daysElapsed" onChange={this.handleDaysElapsed} value={this.state.numOfDaysElapsed} />
              </div>
              <div className="mb-3 text-start">
                <label htmlFor="chargeableProgress" className="form-label">Chargeable hours worked so far</label>
                <input type="number" className="form-control" id="chargeableProgress" onChange={this.handleNumfOfHoursElapsed} value={this.state.numfOfHoursElapsed} />
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="card bg-transparent p-3 fw-bold">
                <div className="mb-3 text-start">
                  <p>Weekdays: {this.state.numOfWeekdays}</p>
                </div>
                <div className="mb-3 text-start">
                  <p>Workdays: {this.state.numOfWorkdays}</p>
                </div>
                <div className="mb-3 text-start">
                  <p>Hours remaining: {this.state.numHoursRemaining}</p>
                </div>
                <div className="mb-3 text-start">
                  <p>Hours needed each day: {this.state.dailyHoursRemaining}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Form />
    )
  }
}

export default App;
