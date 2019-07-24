import React from "react";

export default time => WrappedComponent => {
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
