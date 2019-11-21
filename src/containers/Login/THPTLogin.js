import React, { Component } from "react";
import Guest from "../../layouts/Guest/index";
import THPT from "../../components/Login/THPT";
export default class THPTLogin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Guest>
          <THPT />
        </Guest>
      </>
    );
  }
}
