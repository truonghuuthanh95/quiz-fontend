import React, { Component } from "react";
import { Card, Badge, CardBody } from "reactstrap";
import Countdown from "react-countdown-now";
import { TIME_END_QUIZ } from "../../utils/constants";
const Completionist = () => <span>Hết giờ!</span>;

class TimeCountdown extends Component {
  // Renderer callback with condition
  renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      this.props.handleSubmit();
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };
  render() {
    const { questions } = this.props;
    const timeEndQuiz = localStorage.getItem(TIME_END_QUIZ);
    return (
      <div className="time_countdown">
        <Card body outline color="primary">
          <CardBody>
            <h4 className="text-primary">Trương Hữu Thành</h4>
            <h6>Tên trường</h6>
            <h6>Lớp</h6>
            <h2 className="text-danger">
              <Countdown
                date={Date.now() + (timeEndQuiz - Date.now())}
                renderer={this.renderer}
              />
            </h2>
            <h6>
              <Badge color="secondary">Chưa trả lời</Badge>
              <Badge color="success">Đã trả lời</Badge>
            </h6>
            <div id="list-quiz">
              {questions.map((question, index) =>
                question.Answersed !== null ? (
                  <a
                    href={`#${question.Id}`}
                    className="btn btn-success"
                    key={question.Id}
                  >
                    {index + 1}
                  </a>
                ) : (
                  <a
                    href={`#${question.Id}`}
                    className="btn btn-secondary"
                    key={question.Id}
                  >
                    {index + 1}
                  </a>
                )
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default TimeCountdown;
