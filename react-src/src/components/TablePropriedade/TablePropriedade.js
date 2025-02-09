import React, { Component } from "react";
import { Table, Input } from "semantic-ui-react";
import ModalPropriedade from "../ModalPropriedade/ModalPropriedade";
import ModalConfirmDelete from "../ModalConfirmDelete/ModalConfirmDelete";
import ModalReserva from "../ModalReserva/ModalReserva";
import ModalVerDetalhes from "../ModalDetalhes/ModalDetalhes";

class TablePropriedade extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      searchTerm: "", // Estado para armazenar o termo de pesquisa
    };
  }

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  openModal = () => this.setState({ isModalOpen: true });
  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { propriedade, onPropriedadeUpdated, onPropriedadeDeleted, server, socket } = this.props;
    const { searchTerm } = this.state;

    // Filtra os imóveis pelo bairro digitado
    const filteredProperties = propriedade.filter((prop) =>
      prop.bairro.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const propertyRows = filteredProperties.map((Propriedade) => (
      <Table.Row key={Propriedade._id}>
        <Table.Cell>{Propriedade.propertyType}</Table.Cell>
        <Table.Cell>{Propriedade.bairro}</Table.Cell>
        <Table.Cell>R${Propriedade.valor},00</Table.Cell>
        <Table.Cell>
          <ModalVerDetalhes Propriedade={Propriedade} buttonColor="teal" />
          <ModalPropriedade
            headerTitle="Editar Imóvel"
            buttonTriggerTitle="Editar"
            buttonSubmitTitle="Salvar"
            buttonColor="blue"
            PropriedadeID={Propriedade._id}
            onPropriedadeUpdated={onPropriedadeUpdated}
            server={server}
            socket={socket}
          />
          <ModalConfirmDelete
            headerTitle="Excluir Imóvel"
            buttonTriggerTitle="Excluir"
            buttonColor="black"
            Propriedade={Propriedade}
            onPropriedadeDeleted={onPropriedadeDeleted}
            server={server}
            socket={socket}
          />
          <ModalReserva
            open={this.state.isModalOpen}
            onClose={this.closeModal}
            foto={Propriedade.foto}
            buttonColor="green"
          />
        </Table.Cell>
      </Table.Row>
    ));

    return (
      <div>
        {/* Campo de pesquisa */}
        <Input
          icon="search"
          placeholder="Buscar por bairro..."
          value={searchTerm}
          onChange={this.handleSearchChange}
          style={{ marginBottom: "10px", width: "100%" }}
        />

        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Tipo de Imóvel</Table.HeaderCell>
              <Table.HeaderCell>Bairro</Table.HeaderCell>
              <Table.HeaderCell>Valor Aluguel</Table.HeaderCell>
              <Table.HeaderCell>Ações</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{propertyRows}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default TablePropriedade;
