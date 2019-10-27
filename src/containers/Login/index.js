import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Card,
  CardBody
} from "reactstrap";
import Spinner from "../../components/Spinner";
import { withRouter } from "react-router-dom";
import { TIME_END_QUIZ, QUIZ, USER } from "../../utils/constants";
import { requestLogin } from "../../services/userServices";

class Login extends Component {
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
            localStorage.setItem(TIME_END_QUIZ, new Date(res.Result.User.LoginAt).getTime() + 3.6e+6)
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
  handelChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    const {
      errorPassword,
      errorUsername,
      username,
      password,
      isLoading,
      errorMessage
    } = this.state;
    return (
      <Row>
        {/* <Loading/> */}
        <Col sm={{ size: 4, offset: 4 }}>
          <div className="login_form">
            <Card className="shadow-lg bg-white rounded">
              <CardBody>
                <Form onSubmit={this.handelSubmit}>
                  <FormGroup>
                    <Label for="username">
                      <b>Mã học sinh</b>
                    </Label>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      onChange={this.handelChange}
                      invalid={errorUsername}
                      value={username}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">
                      <b>Họ tên học sinh</b>
                    </Label>
                    <Input
                      type="text"
                      name="password"
                      id="password"
                      onChange={this.handelChange}
                      invalid={errorPassword}
                      value={password}
                    />
                  </FormGroup>
                  <h5 className="text-danger text-center">{errorMessage}</h5>
                  {!isLoading ? (
                    <Button color="success" block>
                      LOGIN
                    </Button>
                  ) : (
                    <Spinner isLoading={true} />
                  )}
                </Form>
              </CardBody>
            </Card>
          </div>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Login);
