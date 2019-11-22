import React, { Component } from "react";
import { Col } from "reactstrap";
import { RESULT } from "../../utils/constants";
import { withRouter } from "react-router-dom";
class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: { NumCorrect: "...", TimeTaken: "..." }
    };
  }
  componentDidMount() {
    const resultLocalStorage = localStorage.getItem(RESULT);
    if (resultLocalStorage) {
      const result = JSON.parse(resultLocalStorage);
      this.setState({ result });
    } else {
      this.props.history.replace("/login");
    }
  }

  render() {
    return (
      <Col className="firework">
        <div style={{ color: "white" }} className="result text-center">
          <h1 style={{ color: "green" }}>NÔP BÀI THÀNH CÔNG</h1>
          <h2>
            Đểm <b>{this.state.result.NumCorrect}/30</b>
          </h2>
          <h2>Thời gian {this.state.result.TimeTaken.substring(3, 8)}</h2>
          <div className="pyro">
            <div className="before"></div>
            <div className="after"></div>
          </div>
        </div>
      </Col>
    );
  }
}

export default withRouter(Result);
