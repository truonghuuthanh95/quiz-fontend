import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Spinner from "../../components/Spinner";
export default class GDTX extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: "",
      studentDOB: "",
      schoolId: "",
      errorMessage: "",
      email: "",
      isLoading: false,
      errorStudentName: "",
      errorStudentDOB: "",
      errorEmail: ""
    };
  }
  handelChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handelSubmit = event => {
    event.preventDefault();
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
      <>
        <Form onSubmit={this.handelSubmit}>
          <FormGroup>
            <Label for="username">
              <b>TRƯỜNG GDTX</b>
            </Label>
            <Input
              type="select"
              name="schoolId"
              bsSize="lg"
              id="schoolId"
              
            >
              <option>--Chọn trưởng--</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
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
          <FormGroup>
            <Label for="password">
              <b>NGÀY SINH</b>
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
          <FormGroup>
            <Label for="password">
              <b>TÊN LỚP</b>
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
