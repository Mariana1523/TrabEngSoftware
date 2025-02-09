import React, { Component } from "react";
import { Button, Modal, Header, Image } from "semantic-ui-react"; // Importe o componente Image
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ModalReserva extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      selectedDate: null,
    };
  }

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  handleConfirmReservation = () => {
    const { selectedDate } = this.state;
    const { onClose } = this.props;

    if (selectedDate) {
      alert(`Reserva confirmada para: ${selectedDate.toLocaleDateString()}`);
      if (typeof onClose === "function") {
        onClose();
      }
      this.handleClose();
    } else {
      alert("Por favor, selecione uma data.");
    }
  };

  render() {
    const { selectedDate } = this.state;
    const { foto, buttonColor } = this.props; // Recebe a URL da imagem e a cor do botão

    return (
      <Modal
        trigger={
          <Button onClick={this.handleOpen} color={buttonColor}>
            Reservar
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Reservar</Modal.Header>
        <Header icon="calendar" content="Reservar Visita" />
        <Modal.Content>
          {/* Exibe a imagem da propriedade */}
          {foto && (
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <Image src={foto} size="medium" centered />
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <p>Selecione a data para a visita:</p>
            <DatePicker
              selected={selectedDate}
              onChange={this.handleDateChange}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              placeholderText="Clique para selecionar uma data"
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color="grey" onClick={this.handleClose}>
            Cancelar
          </Button>
          <Button color="blue" onClick={this.handleConfirmReservation}>
            Confirmar Reserva
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ModalReserva;
