import React from "react";
import WithPortal from "../hocs/WithPortal";
import WithTimer from "../hocs/WithTimer";
import Alert from "./Alert";

export default class AlertList extends React.Component {
  constructor(props) {
    super(props);
    this.container = document.createElement("div");
    this.container.className = "alert-wrapper";
  }
  componentDidMount() {
    document.body.insertBefore(this.container, document.body.firstChild);
  }

  componentWillUnmount() {
    document.body.removeChild(this.container);
  }
  render() {
    const AlertWithPortal = WithPortal(this.container)(Alert);
    const AlertWithTimer = WithTimer(2000)(AlertWithPortal);

    return this.props.alerts.map((alert, index) => (
      <AlertWithTimer
        onTimeUp={() => this.props.onDelete(alert)}
        key={index}
        message={alert}
      />
    ));
  }
}
