import React, { Component } from "react";
import AuthState from "providers/Authentication/AuthState";

const ContextWrapper = (ChildComponent) => {
  class ComposedComponent extends Component {
    render() {
      return (
        <AuthState>
          <ChildComponent {...this.props} />
        </AuthState>
      );
    }
  }

  return ComposedComponent;
};

export default ContextWrapper;
