import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Spinner from "../../components/Spinner";
import { registGDTX } from "../../services/userServices";
import { TIME_END_QUIZ, QUIZ, USER } from "../../utils/constants";
import { withRouter } from 'react-router-dom';
 class GDTX extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: "",
      studentDOB: "",
      schoolId: "",
      errorMessage: "",
      email: "",
      isLoading: false,
      className: ""
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
    if (!this.state.schoolId) {
      this.setState({ errorMessage: "Vui lòng chọn trung tâm" });
    } else {
      const {
        studentName,
        studentDOB,
        schoolId,
        email,
        className
      } = this.state;
      this.setState({ isLoading: true, errorMessage: "" }, async () => {
        const res = await registGDTX(
          studentName,
          schoolId,
          studentDOB,
          className,
          email
        );
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
        }
      });
    }
  };
  render() {
    const {
      isLoading,
      errorMessage,
      schoolId,
      studentDOB,
      studentName,
      email,
      className
    } = this.state;
    return (
      <>
        <Form onSubmit={this.handelSubmit}>
          <FormGroup>
            <Label for="schoolId">
              <b>TT GDTX</b>
            </Label>
            <Input
              type="select"
              name="schoolId"
              bsSize="lg"
              id="schoolId"
              value={schoolId}
              onChange={this.handelChange}
            >
              <option value="">--Chọn trung tâm--</option>
              <option value="TT GDTX Q1">TT GDTX Q1</option>
              <option value="TT GDTX Q2">TT GDTX Q2</option>
              <option value="TT GDTX Q3">TT GDTX Q3</option>
              <option value="TT GDTX Q5">TT GDTX Q5</option>
              <option value="TT GDTX Q5">TT GDTX Q5</option>
              <option value="TT GDTX Q7">TT GDTX Q7</option>
              <option value="TT GDTX Q8">TT GDTX Q8</option>
              <option value="TT GDTX Q9">TT GDTX Q9</option>
              <option value="TT GDTX Q10">TT GDTX Q10</option>
              <option value="TT GDTX Q11">TT GDTX Q11</option>
              <option value="TT GDTX Q12">TT GDTX Q12</option>
              <option value="TT GDTX Q BÌNH TÂN">TT GDTX Q BÌNH TÂN</option>
              <option value="TT GDTX Q BÌNH THẠNH">TT GDTX Q BÌNH THẠNH</option>
              <option value="TT GDTX Q GÒ VẤP">TT GDTX Q GÒ VẤP</option>
              <option value="TT GDTX Q PHÚ NHUẬN">TT GDTX Q PHÚ NHUẬN</option>
              <option value="TT GDTX Q TÂN PHÚ">TT GDTX Q TÂN PHÚ</option>
              <option value="TT GDTX Q THỦ ĐỨC">TT GDTX Q THỦ ĐỨC</option>
              <option value="TT GDTX CHU VĂN AN">TT GDTX CHU VĂN AN</option>
              <option value="TT GDTX GIA ĐỊNH">TT GDTX GIA ĐỊNH</option>
              <option value="TT GDTX H BÌNH CHÁNH">TT GDTX H BÌNH CHÁNH</option>
              <option value="TT GDTX H CẦN GIỜ">TT GDTX H CẦN GIỜ</option>
              <option value="TT GDTX H CỦ CHI">TT GDTX H CỦ CHI</option>
              <option value="TT GDTX H HÓC MÔN">TT GDTX H HÓC MÔN</option>
              <option value="TT GDTX H NHÀ BÈ">TT GDTX H NHÀ BÈ</option>
              <option value="TT GDTX H LÊ QUÝ ĐÔN">TT GDTX H LÊ QUÝ ĐÔN</option>
              <option value="TT GDTX THANH NIÊN XUNG PHONG">
                TT GDTX THANH NIÊN XUNG PHONG
              </option>
              <option value="TT GDTX TIẾNG HOA">TT GDTX TIẾNG HOA</option>
              <option value="TT GDTX TÔN ĐỨC THẮNG">
                TT GDTX TÔN ĐỨC THẮNG
              </option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="studentName">
              <b>HỌ TÊN HỌC SINH</b>
            </Label>
            <Input
              type="text"
              name="studentName"
              id="studentName"
              onChange={this.handelChange}
              value={studentName}
              bsSize="lg"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="studentDOB">
              <b>NGÀY SINH (dd/mm/yyyy)</b>
            </Label>
            <Input
              type="text"
              name="studentDOB"
              id="studentDOB"
              onChange={this.handelChange}
              value={studentDOB}
              bsSize="lg"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="className">
              <b>TÊN LỚP</b>
            </Label>
            <Input
              type="text"
              name="className"
              id="className"
              onChange={this.handelChange}
              value={className}
              bsSize="lg"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">
              <b>EMAIL</b>
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              required
              onChange={this.handelChange}
              value={email}
              bsSize="lg"
              maxLength="50"
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
export default withRouter(GDTX);