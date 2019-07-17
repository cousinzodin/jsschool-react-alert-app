import React from "react";
import ReactDOM from "react-dom";
import "./App.css";

const WithPortal = (element = document.body) => WrappedComponent => {
  return class extends React.Component {
    render() {
      return ReactDOM.createPortal(
        <WrappedComponent {...this.props} />,
        element
      );
    }
  };
};

const WithTimer = time => WrappedComponent => {
  return class extends React.Component {
    constructor() {
      super();
      this.timer = null;
    }
    componentDidMount() {
      this.timer = setTimeout(() => this.onTimer(), time);
    }

    componentWillUnmount() {
      clearTimeout(this.timer);
    }

    onTimer() {
      if (this.props.onTimeUp) {
        this.props.onTimeUp();
      }
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

const Alert = props => <div className="alert">{props.message}</div>;

class AlertList extends React.Component {
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

class AlertWrapper extends React.Component {
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
          onDelete={e => this.removeAlert(e)}
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

function App() {
  return (
    <div className="App">
      <AlertWrapper />
      <p>
        <a href="https://github.com/cousinzodin//jsschool-react-alert-app">
          View on Github
        </a>
      </p>
    </div>
  );
}

export default App;
