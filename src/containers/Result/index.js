import React, { Component } from "react";
import successIcon from "../../static/images/check-circle-solid.svg";
import {
  Card,
  CardBody,
  Col
} from "reactstrap";
import axios from 'axios';
import { submitQuiz } from '../../services/quizServices';
class Result extends Component {
  async componentDidMount(){
    let data = [
      {
        UserId: "1",
        QuestionId: 1,
        ChoosenId: null
      },
      {
        UserId: "1",
        QuestionId: 2,
        ChoosenId: null
      }
    ]
    const res = submitQuiz(data)
  }
  render() {
    return (
        <Col sm={{ size: 6, offset: 3 }} >
      <div className="result">
        <Card body>
          <CardBody>
            <h3 className="text-center text-success mt-3"> <img className="success-icon" src={successIcon} />NỘP BÀI THÀNH CÔNG</h3>{" "}
          </CardBody>
        </Card>
      </div>
      </Col>
    );
  }
}

export default Result;
