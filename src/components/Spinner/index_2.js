import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import Spinner from "./index";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
  }

  render() {
    return (
      <div>
        <Modal isOpen={true}>
          <ModalBody>
            <Spinner isLoading={true} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Loading;
