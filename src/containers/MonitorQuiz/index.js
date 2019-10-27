import React, { Component } from "react";
import { Table, Container } from "reactstrap";
class MonitorQuiz extends Component {
  render() {
    return (
      <Container>
        <h3 className="text-center text-primary text-uppercase">
          Thống kê điểm đạt được
        </h3>
        <Table bordered responsive>
          <thead>
            <tr>
              <th>Họ Tên</th>
              <th>Trường</th>
              <th>Lớp</th>
              <th>Điểm</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default MonitorQuiz;
