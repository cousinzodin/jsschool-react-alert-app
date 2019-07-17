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

// const WithTimer = WrappedComponent => {
//   return class extends React.Component {
//     constructor() {
//       super();
//       this.state = { renderChild: true };
//     }
//     componentDidMount() {
//       setTimeout(() => this.setState({ renderChild: false }), 1000);
//     }
//     render() {
//       return this.state.renderChild ? (
//         <WrappedComponent {...this.props} />
//       ) : null;
//     }
//   };
// };

const Alert = props => <div className="alert">{props.message}</div>;

class AlertWrapper extends React.Component {
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
    //const TimedAlert = WithTimer(MyAlert);

    return this.props.alerts.map((alert, index) => (
      <AlertWithPortal key={index} message={alert} />
    ));
  }
}

class AlertController extends React.Component {
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
        <AlertWrapper alerts={this.state.alerts} />
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
      <AlertController />
    </div>
  );
}

export default App;
