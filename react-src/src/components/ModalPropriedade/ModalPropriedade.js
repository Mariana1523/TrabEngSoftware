import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

import FormPropriedade from '../FormPropriedade/FormPropriedade';

class ModalPropriedade extends Component {

  render() {
    return (
      <Modal
        trigger={<Button color={this.props.buttonColor}>{this.props.buttonTriggerTitle}</Button>}
        dimmer='inverted'
        size='tiny'
        closeIcon='close'
      >
        <Modal.Header>{this.props.headerTitle}</Modal.Header>
        <Modal.Content>
          <FormPropriedade
            buttonSubmitTitle={this.props.buttonSubmitTitle}
            buttonColor={this.props.buttonColor}
            PropriedadeID={this.props.PropriedadeID}
            onPropriedadeAdded={this.props.onPropriedadeAdded}
            onPropriedadeUpdated={this.props.onPropriedadeUpdated}
            server={this.props.server}
            socket={this.props.socket}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalPropriedade;
