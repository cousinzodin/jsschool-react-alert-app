import React from "react";
import ReactDOM from "react-dom";

export default (element = document.body) => WrappedComponent => {
  return class extends React.Component {
    render() {
      return ReactDOM.createPortal(
        <WrappedComponent {...this.props} />,
        element
      );
    }
  };
};
