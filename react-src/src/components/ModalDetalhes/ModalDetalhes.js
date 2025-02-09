import React, { Component } from "react";
import { Modal, Button, Header, Image, List } from "semantic-ui-react";

class ModalVerDetalhes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const { modalOpen } = this.state;
    const { Propriedade, buttonColor } = this.props;

    return (
      <Modal
        trigger={
          <Button onClick={this.handleOpen} color={buttonColor}>
            Ver Detalhes
          </Button>
        }
        open={modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Detalhes da Propriedade</Modal.Header>
        <Modal.Content image>
          {/* Exibe a imagem da propriedade */}
          {Propriedade.foto && (
            <Image
              src={Propriedade.foto}
              size="medium"
              wrapped
              style={{ marginBottom: "20px" }}
            />
          )}
          <Modal.Description>
            <Header>{Propriedade.propertyType}</Header>
            <List>
              <List.Item>
                <List.Icon name="bed" />
                <List.Content>Quartos: {Propriedade.quartos}</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="bath" />
                <List.Content>Suítes: {Propriedade.suites}</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="home" />
                <List.Content>
                  Salas de Estar: {Propriedade.salasEstar}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="car" />
                <List.Content>
                  Vagas na Garagem: {Propriedade.vagasGaragem}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="expand" />
                <List.Content>Área: {Propriedade.area} m²</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="archive" />
                <List.Content>
                  Armário Embutido:{" "}
                  {Propriedade.armarioEmbutido ? "Sim" : "Não"}
                </List.Content>
              </List.Item>
              {Propriedade.propertyType === "Apartamento" && (
                <>
                  <List.Item>
                    <List.Icon name="building" />
                    <List.Content>Andar: {Propriedade.andar}</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="money" />
                    <List.Content>
                      Valor do Condomínio: R$ {Propriedade.valorCondominio}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name="shield" />
                    <List.Content>
                      Portaria 24h: {Propriedade.portaria24h ? "Sim" : "Não"}
                    </List.Content>
                  </List.Item>
                </>
              )}
            </List>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="grey" onClick={this.handleClose}>
            Fechar
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ModalVerDetalhes;
