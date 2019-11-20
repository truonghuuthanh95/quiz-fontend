import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Question from "../../components/Question";
import TimeCountdown from "../../components/TimeCountdown";
import SubmitModal from "../../components/Confirm/index";
import { withRouter } from "react-router-dom";
import Spinner from "../../components/Spinner/index_2";
import { QUIZ, TIME_END_QUIZ, USER, RESULT } from "../../utils/constants";
import { submitQuiz } from "../../services/quizServices";
class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      questions: [],
      user: null
    };
  }

  componentDidMount() {
    let questionsStorage = localStorage.getItem(QUIZ);
    const questions = JSON.parse(questionsStorage);
    let userStorage = localStorage.getItem(USER);
    const user = JSON.parse(userStorage);
    if (questionsStorage) {
      this.setState({ questions, user });
    }
  }

  handleSelectAnswers = (questionNo, answered) => {
    let { questions } = this.state;
    let questionSelected = questions.find(
      question => question.Id === questionNo
    );
    questionSelected.Answersed = answered;
    let indexQuestionSelected = questions.findIndex(
      question => question.Id === questionNo
    );
    questions[indexQuestionSelected] = questionSelected;
    this.setState({ questions }, () => {
      localStorage.setItem(QUIZ, JSON.stringify(this.state.questions));
    });
  };
  handleSubmit = () => {
    const quiz = localStorage.getItem(QUIZ);
    const timeStartQuiz = localStorage.getItem(TIME_END_QUIZ);
    if (quiz && timeStartQuiz) {
      this.setState({ isLoading: true });
      let data = [];
      const { questions, user } = this.state;
      questions.forEach(question => {
        const idCorrect = question.Choices.filter(choice => choice.IsCorrect == true);
        if (idCorrect.length > 0) {
          data.push({
            UserId: user.Id,
            QuestionId: question.Id,
            ChoosenId: question.Answersed,
            IsCorrect: question.Answersed == idCorrect[0].Id? true : false,
          });
        }
        
        
      });
      submitQuiz(data)
        .then(res => {
          if (res.data.StatusCode === 200) {
            localStorage.clear();
            localStorage.setItem(RESULT,JSON.stringify(res.data.Result));
            this.props.history.replace("result");
          }
        })
        .catch(error => console.log(error));
    } else {
      localStorage.clear();
      this.props.history.replace("/login");
    }
  };
  isSubmit = isSubmit => {
    if (isSubmit) {
      this.handleSubmit();
    }
  };
  render() {
    const { questions, isLoading, user } = this.state;
    return (
      <Row>
        {isLoading ? <Spinner /> : null}
        <Col sm={8}>
          <div data-spy="scroll" data-target="#list-quiz" data-offset="0">
            {questions.map((question, index) => (
              <Question
                handleSelectAnswers={this.handleSelectAnswers}
                question={question}
                key={question.Id}
                index={index}
              />
            ))}
          </div>
          <div className="text-center submit_quiz">
            <SubmitModal
              buttonLabel="KẾT THÚC BÀI LÀM"
              isSubmit={this.isSubmit}
            />
          </div>
        </Col>
        <Col sm={4}>
          <TimeCountdown
            questions={questions}
            user={user}
            handleSubmit={this.handleSubmit}
          />
        </Col>
      </Row>
    );
  }
}

export default withRouter(Quiz);
