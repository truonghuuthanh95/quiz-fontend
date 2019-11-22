import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Spinner from "../../components/Spinner";
import { TIME_END_QUIZ, QUIZ, USER } from "../../utils/constants";
import { requestLogin } from "../../services/userServices";
import { withRouter } from 'react-router-dom';
class THPT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isError: false,
      errorUsername: false,
      errorPassword: false,
      isLoading: false,
      errorMessage: ""
    };
  }
  handelChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handelSubmit = async event => {
    event.preventDefault();
    const { username, password } = this.state;
    if (username === "" || password === "") {
      if (username === "") {
        this.setState({ errorUsername: true });
      }
      if (password === "") {
        this.setState({ errorPassword: true });
      }
    } else {
      this.setState(
        {
          errorUsername: false,
          errorPassword: false,
          isLoading: true,
          errorMessage: ""
        },
        async () => {
          const { username, password } = this.state;
          const res = await requestLogin(username, password);
          this.setState({ isLoading: false });
          if (res.StatusCode === 200) {
            localStorage.setItem(USER, JSON.stringify(res.Result.User));
            localStorage.setItem(
              TIME_END_QUIZ,
              new Date(res.Result.User.LoginAt).getTime() + 1.2e6
            );
            localStorage.setItem(QUIZ, JSON.stringify(res.Result.Questions));
            return this.props.history.push("/quiz");
          } else if (res.StatusCode === 302) {
            this.setState({ errorMessage: "Hoc sinh đã nộp bài làm!" });
          } else if (res.StatusCode === 404) {
            this.setState({ errorMessage: "Không tim thấy học sinh" });
          }
        }
      );
    }
  };
  render() {
    const {
      errorPassword,
      errorUsername,
      username,
      password,
      isLoading,
      errorMessage,    
    } = this.state;
    return (
      <>
        <Form onSubmit={this.handelSubmit}>
          <FormGroup>
            <Label for="username">
              <b>MÃ HỌC SINH</b>
            </Label>
            <Input
              type="text"
              name="username"
              id="username"
              onChange={this.handelChange}
              invalid={errorUsername}
              value={username}
              bsSize="lg"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">
              <b>HỌ TÊN HỌC SINH</b>
            </Label>
            <Input
              type="text"
              name="password"
              id="password"
              onChange={this.handelChange}
              invalid={errorPassword}
              value={password}
              bsSize="lg"
            />
          </FormGroup>
          <h5 className="text-danger text-center">{errorMessage}</h5>
          {!isLoading ? (
            <Button size="lg" color="success" block>
              <b>BẮT ĐẦU</b>
            </Button>
          ) : (
            <Spinner isLoading={true} />
          )}
        </Form>
      </>
    );
  }
}
export default withRouter(THPT);