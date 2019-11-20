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
import { getQuizSubmited } from "../../services/quizServices";
import logoSo from "../../static/images/500x500.png";
import backGround from '../../static/images/6912eb4da70b5e55071a.jpg';
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
      errorMessage: "",
      countAccess: 0
    };
  }
  async componentDidMount() {
    const countAccess = await getQuizSubmited();
    this.setState({ countAccess: countAccess.Result });
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
      errorMessage,
      countAccess
    } = this.state;
    return (
      <Row style={{ backgroundColor: "#76b852", height: "100vh" }}>
        <Col xs={12} md={6} style={{ paddingTop: 120 }}>
          <div style={{ color: "white", textAlign: "center" }}>
            <h3>
              <b>TỔNG SỐ THÍ SINH ĐÃ DỰ THI</b>
            </h3>
            <h1 className="total-access">
              <b>{countAccess > 0 ? countAccess : "..."}</b>
            </h1>
          </div>
          <div
            style={{
              paddingTop: 20,
              paddingLeft: 20,
              color: "yellow"
            }}
          >
            <p>
              <b>* Hướng dẫn đăng nhập</b>
            </p>
            <p>
              - Học sinh sử dụng mã học sinh trên{" "}
              <b>hệ thống Cơ sở dữ liệu Giáo dục Trung học (chuyển trường) </b>
              do phòng
              <b> Giáo dục Trung học Sở GDĐT TP.HCM</b> quản lý, vui lòng liên
              hệ nhà trường để thông tin thêm. Sau đó nhập họ và tên để bắt đầu
              bài làm.
            </p>
            <p>
              - Các học sinh được tham gia khi nhà trường đã làm công tác nộp dữ liệu
              học sinh lên hệ thống <b>Cơ sỡ dữ liệu Giáo dục Trung học </b>
              trước ngày
              <b> 18/11/2019</b>
            </p>
            <p>
              - Khuyến khích sử dụng trình duyệt <b>Google Chrome</b> để phần
              thi diễn ra tốt nhất
            </p>
          </div>
        </Col>

        <Col>
          <Col md={{ size: 8, offset: 2 }}>
            <div className="login_form">
              <Card className="shadow-lg bg-white rounded">
                <CardBody>
                  <p style={{ textAlign: "center" }}>
                    <img
                      style={{ marginTop: -100, width: 150 }}
                      src={logoSo}
                      alt="logo"
                    />
                  </p>
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
                </CardBody>
              </Card>
            </div>
          </Col>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Login);
