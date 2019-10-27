import React, { Component } from "react";
import { Card, CardTitle, Form, FormGroup, CustomInput } from "reactstrap";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: null,
      answered: null
    };
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.question.answered !== prevState.answered || nextProps.question.no != prevState.no) {
  //     return {
  //       no: nextProps.question.no,
  //       answered: nextProps.question.answered
  //     };
  //   }
  //   return null;
  // }
  handelChange = event => {
    const target = event.target;
    const value = target.id;
    this.props.handleSelectAnswers(this.props.question.Id, parseInt(value));
  };
  // shouldComponentUpdate(nextProps, nextState){
  //   if (nextProps === this.props) {
  //     return false;
  //   }
  //   return true;
  // }
  render() {
    const { question, index } = this.props;
    return (
      <Card body outline color="warning" id={question.Id}>
        <CardTitle>
          <b>
            Câu {index + 1}: {question.Text}
          </b>
        </CardTitle>
        <Form>
          <FormGroup
            key={question.Id}
            value={question.Answersed}
            onChange={this.handelChange}
          >
            {question.Choices.map(choice =>
              question.Answersed === choice.Id ? (
                <CustomInput
                  type="radio"
                  id={choice.Id}
                  name={question.Id}
                  label={choice.Text}
                  defaultChecked
                  key={choice.Id}
                />
              ) : (
                <CustomInput
                  type="radio"
                  id={choice.Id}
                  name={question.Id}
                  label={choice.Text}
                  key={choice.Id}
                />
              )
            )}
          </FormGroup>
        </Form>
      </Card>
    );
  }
}

export default Question;
