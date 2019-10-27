import React from "react";
import { Spinner } from "reactstrap";
const spinner = props => {
  if (props.isLoading) {
    return (
      <div className="text-center">
        <Spinner type="grow" color="primary" />
        <Spinner type="grow" color="secondary" />
        <Spinner type="grow" color="success" />
        <Spinner type="grow" color="danger" />
        <Spinner type="grow" color="warning" />
        <Spinner type="grow" color="info" />
        <Spinner type="grow" color="dark" />
      </div>
    );
  }
  return null;
};

export default spinner;
