import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class Comfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  
  render() {
    return (
      <div>
        <Button color="success" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Xác nhận</ModalHeader>
          <ModalBody>Bạn có chắc muốn kết thúc bài làm?</ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => {this.toggle(); this.props.isSubmit(true);}}>
              Kết thúc
            </Button>
            <Button color="danger" onClick={() => {this.toggle(); this.props.isSubmit(false);}}>
              Hủy
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Comfirm;
