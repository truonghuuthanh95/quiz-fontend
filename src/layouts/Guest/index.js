import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { getQuizSubmited } from "../../services/quizServices";
import logoSo from "../../static/images/500x500.png";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countAccess: 0
    };
  }
  async componentDidMount() {
    const countAccess = await getQuizSubmited();
    this.setState({ countAccess: countAccess.Result });
  }

  render() {
    const { countAccess } = this.state;
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
              <b>Hướng dẫn đăng nhập</b>
            </p>
            <p>
              <b>* Khối Trung học phổ thông</b>
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
              - Các học sinh được tham gia khi nhà trường đã làm công tác nộp dữ
              liệu học sinh lên hệ thống{" "}
              <b>Cơ sỡ dữ liệu Giáo dục Trung học </b>
              trước ngày
              <b> 18/11/2019</b>
            </p>
            <p>
              <b>* Khối Giáo dục thường xuyên</b>
            </p>
            <p>
              - Học sinh chọn TT GDTX, sau đó nhập các thông tin cần thiết để
              bắt đầu bài thi{" "}
            </p>
            <p>
              <i>
                Khuyến khích sử dụng trình duyệt <b>Google Chrome</b> để phần
                thi diễn ra tốt nhất
              </i>
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
                  {this.props.children}
                </CardBody>
              </Card>
            </div>
          </Col>
        </Col>
      </Row>
    );
  }
}

export default Login;
