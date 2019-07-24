import React from "react";
import AlertList from "./AlertList";

export default class AlertWrapper extends React.Component {
  constructor() {
    super();
    this.input = React.createRef();
    this.state = { message: "", alerts: [] };
  }

  createAlert(e) {
    e.preventDefault();
    const alerts = [...this.state.alerts, this.state.message];
    this.setState({ message: "", alerts: alerts });
    this.input.current.focus();
  }

  removeAlert(value) {
    const alerts = this.state.alerts.filter(i => i !== value);
    this.setState({ alerts: alerts });
  }

  componentDidMount() {
    this.input.current.focus();
  }
  handleChange(e) {
    this.setState({ message: e.target.value });
  }
  render() {
    return (
      <div className="form">
        <h1>Alert App</h1>
        <AlertList
          alerts={this.state.alerts}
          onDelete={alertMessage => this.removeAlert(alertMessage)}
        />
        <form onSubmit={e => this.createAlert(e)}>
          <input
            value={this.state.message}
            ref={this.input}
            onChange={e => this.handleChange(e)}
            type="text"
          />
          <button type="submit" disabled={!this.state.message}>
            Add alert
          </button>
        </form>
      </div>
    );
  }
}
