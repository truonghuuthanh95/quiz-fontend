import React, { Component } from "react";
import { Button } from "reactstrap";
import Guest from "../../layouts/Guest/index";
import THPT from "../../components/Login/THPT";
import GDTX from "../../components/Login/GDTX";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginSelected: ''
    };
  }

  handleSelectLogin = loginSelected => {
    this.setState({ loginSelected });
  };
  render() {
    const { loginSelected } = this.state;
    console.log(loginSelected);
    return (
      <>
        <Guest>
          {!loginSelected ? (
            <>
              <Button
                name="loginSelected"
                block
                color="primary"
                value="thpt"
                onClick={() => this.handleSelectLogin("thpt")}
                size="lg"
              >
                <b>TRUNG HỌC PHỔ THÔNG</b>
              </Button>
              <Button
                name="loginSelected"
                block
                color="primary"
                value="gdtx"
                onClick={() => this.handleSelectLogin("gdtx")}
                size="lg"
              >
                <b>GIÁO DỤC THƯỜNG XUYÊN</b>
              </Button>
            </>
          ) : (
            <>{loginSelected === "thpt" ? <THPT /> : <GDTX />}</>
          )}
        </Guest>
      </>
    );
  }
}

export default Login;
