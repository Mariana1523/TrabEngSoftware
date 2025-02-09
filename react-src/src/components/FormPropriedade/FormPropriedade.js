import React, { Component } from "react";
import { Message, Button, Form, Select, Checkbox } from "semantic-ui-react";
import axios from "axios";

const propertyTypeOptions = [
  { key: "Casa", text: "Casa", value: "Casa" },
  { key: "Apartamento", text: "Apartamento", value: "Apartamento" },
];

class FormPropriedade extends Component {
  constructor(props) {
    super(props);

    this.state = {
      propertyType: "", // Tipo de imóvel (Casa ou Apartamento)
      quartos: "", // Quantidade de quartos
      suites: "", // Quantidade de suítes
      salasEstar: "", // Quantidade de salas de estar
      salasJantar: "", // Quantidade de salas de jantar (apenas para apartamento)
      vagasGaragem: "", // Número de vagas na garagem
      area: "", // Área em metros quadrados
      armarioEmbutido: false, // Possui armário embutido?
      descricao: "", // Descrição do imóvel
      andar: "", // Andar (apenas para apartamento)
      valorCondominio: "", // Valor do condomínio (apenas para apartamento)
      portaria24h: false, // Possui portaria 24 horas? (apenas para apartamento)
      foto: "", // URL da foto do imóvel
      valor: "", // Novo campo: valor do imóvel (double)
      bairro: "", // Novo campo: bairro do imóvel (string)
      formClassName: "",
      formSuccessMessage: "",
      formErrorMessage: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearSpecificFields = this.clearSpecificFields.bind(this);
  }

  componentDidMount() {
    // Preenche o formulário com os dados apropriados se o ID do imóvel for fornecido
    if (this.props.PropriedadeID) {
      axios
        .get(`${this.props.server}/api/${this.props.PropriedadeID}`)
        .then((response) => {
          console.log("Dados recebidos da API:", response.data);
          this.setState({
            propertyType: response.data.propertyType,
            quartos: response.data.quartos ?? "",
            suites: response.data.suites ?? "",
            salasEstar: response.data.salasEstar ?? "",
            salasJantar: response.data.salasJantar ?? "",
            vagasGaragem: response.data.vagasGaragem ?? "",
            area: response.data.area ?? "",
            armarioEmbutido: response.data.armarioEmbutido ?? false,
            descricao: response.data.descricao ?? "",
            andar: response.data.andar ?? "",
            valorCondominio: response.data.valorCondominio ?? "",
            portaria24h: response.data.portaria24h ?? false,
            foto: response.data.foto ?? "",
            valor: response.data.valor ?? "", // Novo campo
            bairro: response.data.bairro ?? "", // Novo campo
          });
        })
        .catch((err) => {
          console.log("Erro ao buscar dados do imóvel:", err);
        });
    }
  }

  // Método para limpar campos específicos ao alterar o tipo de imóvel
  clearSpecificFields(propertyType) {
    if (propertyType === "Casa") {
      // Limpa campos específicos de Apartamento
      this.setState({
        salasJantar: "",
        andar: "",
        valorCondominio: "",
        portaria24h: false,
      });
    } else if (propertyType === "Apartamento") {
      // Limpa campos específicos de Casa (se houver)
      // Neste caso, não há campos específicos de Casa que precisem ser limpos
    }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSelectChange(e, data) {
    console.log("Valor selecionado:", data.value);
    this.clearSpecificFields(data.value); // Limpa os campos específicos antes de atualizar o estado
    this.setState({ [data.name]: data.value });
  }

  handleCheckboxChange(e, data) {
    this.setState({ [data.name]: data.checked });
  }

  handleSubmit(e) {
    // Impede o recarregamento da página
    e.preventDefault();

    // Validação do lado do cliente: Verifica se os campos obrigatórios estão preenchidos
    const {
      propertyType,
      quartos,
      suites,
      salasEstar,
      vagasGaragem,
      area,
      descricao,
      valor,
      bairro,
    } = this.state;

    if (
      !propertyType ||
      !quartos ||
      !suites ||
      !salasEstar ||
      !vagasGaragem ||
      !area ||
      !descricao ||
      !valor ||
      !bairro
    ) {
      this.setState({
        formClassName: "warning",
        formErrorMessage: "Por favor, preencha todos os campos obrigatórios.",
      });
      return; // Interrompe a execução adicional
    }

    // Cria um objeto com os dados do imóvel
    const Propriedade = {
      propertyType: this.state.propertyType,
      quartos: this.state.quartos,
      suites: this.state.suites,
      salasEstar: this.state.salasEstar,
      salasJantar: this.state.salasJantar,
      vagasGaragem: this.state.vagasGaragem,
      area: this.state.area,
      armarioEmbutido: this.state.armarioEmbutido,
      descricao: this.state.descricao,
      andar: this.state.andar,
      valorCondominio: this.state.valorCondominio,
      portaria24h: this.state.portaria24h,
      foto: this.state.foto,
      valor: this.state.valor, // Novo campo
      bairro: this.state.bairro, // Novo campo
    };

    // Define o método HTTP (PUT para atualização, POST para criação)
    const method = this.props.PropriedadeID ? "put" : "post";
    const params = this.props.PropriedadeID ? this.props.PropriedadeID : "";
    axios({
      method: method,
      responseType: "json",
      url: `${this.props.server}/api/${params}`,
      data: Propriedade,
    })
      .then((response) => {
        this.setState({
          formClassName: "success",
          formSuccessMessage: response.data.msg,
        });

        if (!this.props.PropriedadeID) {
          // Limpa o formulário após a criação de um novo imóvel
          this.setState({
            propertyType: "",
            quartos: "",
            suites: "",
            salasEstar: "",
            salasJantar: "",
            vagasGaragem: "",
            area: "",
            armarioEmbutido: false,
            descricao: "",
            andar: "",
            valorCondominio: "",
            portaria24h: false,
            foto: "",
            valor: "", // Limpa o campo
            bairro: "", // Limpa o campo
          });
          this.props.onPropriedadeAdded(response.data.result);
          this.props.socket.emit("add", response.data.result);
        } else {
          // Atualiza a lista de imóveis após a edição
          this.props.onPropriedadeUpdated(response.data.result);
          this.props.socket.emit("update", response.data.result);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data) {
            this.setState({
              formClassName: "warning",
              formErrorMessage: err.response.data.msg,
            });
          }
        } else {
          this.setState({
            formClassName: "warning",
            formErrorMessage: "Algo deu errado. " + err,
          });
        }
      });
  }

  render() {
    const {
      propertyType,
      quartos,
      suites,
      salasEstar,
      salasJantar,
      vagasGaragem,
      area,
      armarioEmbutido,
      descricao,
      andar,
      valorCondominio,
      portaria24h,
      foto,
      valor,
      bairro,
      formClassName,
      formSuccessMessage,
      formErrorMessage,
    } = this.state;

    return (
      <Form className={formClassName} onSubmit={this.handleSubmit}>
        <Form.Field
          control={Select}
          label="Tipo de Imóvel *"
          options={propertyTypeOptions}
          placeholder="Selecione"
          name="propertyType"
          value={propertyType}
          onChange={this.handleSelectChange}
        />
        <Form.Group widths="equal">
          <Form.Input
            label="Quantidade de Quartos *"
            type="number"
            placeholder="2"
            min={1}
            max={10}
            name="quartos"
            value={quartos}
            onChange={this.handleInputChange}
          />
          <Form.Input
            label="Quantidade de Suítes *"
            type="number"
            placeholder="1"
            min={0}
            max={5}
            name="suites"
            value={suites}
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Quantidade de Salas de Estar *"
            type="number"
            placeholder="1"
            min={1}
            max={5}
            name="salasEstar"
            value={salasEstar}
            onChange={this.handleInputChange}
          />
          {propertyType === "Apartamento" && (
            <Form.Input
              label="Quantidade de Salas de Jantar *"
              type="number"
              placeholder="1"
              min={0}
              max={5}
              name="salasJantar"
              value={salasJantar}
              onChange={this.handleInputChange}
            />
          )}
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Número de Vagas na Garagem *"
            type="number"
            placeholder="1"
            min={0}
            max={5}
            name="vagasGaragem"
            value={vagasGaragem}
            onChange={this.handleInputChange}
          />
          <Form.Input
            label="Área (m²) *"
            type="number"
            placeholder="100"
            min={1}
            name="area"
            value={area}
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            label="Valor do Imóvel (R$) *"
            type="number"
            placeholder="500000"
            min={0}
            step="0.01"
            name="valor"
            value={valor}
            onChange={this.handleInputChange}
          />
          <Form.Input
            label="Bairro *"
            type="text"
            placeholder="Centro"
            name="bairro"
            value={bairro}
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Form.Field>
          <Checkbox
            label="Possui Armário Embutido"
            name="armarioEmbutido"
            checked={armarioEmbutido}
            onChange={this.handleCheckboxChange}
          />
        </Form.Field>
        <Form.TextArea
          label="Descrição *"
          placeholder="Detalhes sobre o imóvel..."
          name="descricao"
          value={descricao}
          onChange={this.handleInputChange}
        />
        {propertyType === "Apartamento" && (
          <>
            <Form.Group widths="equal">
              <Form.Input
                label="Andar"
                type="number"
                placeholder="5"
                min={0}
                name="andar"
                value={andar}
                onChange={this.handleInputChange}
              />
              <Form.Input
                label="Valor do Condomínio"
                type="number"
                placeholder="500"
                min={0}
                name="valorCondominio"
                value={valorCondominio}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Field>
              <Checkbox
                label="Condomínio com Portaria 24 Horas"
                name="portaria24h"
                checked={portaria24h}
                onChange={this.handleCheckboxChange}
              />
            </Form.Field>
          </>
        )}
        <Form.Input
          label="URL da Foto"
          type="text"
          placeholder="https://example.com/imagem.jpg"
          name="foto"
          value={foto}
          onChange={this.handleInputChange}
        />
        <Message
          success
          color="green"
          header="Sucesso!"
          content={formSuccessMessage}
        />
        <Message
          warning
          color="yellow"
          header="Ops!"
          content={formErrorMessage}
        />
        <Button color={this.props.buttonColor} floated="right">
          {this.props.buttonSubmitTitle}
        </Button>
        <br />
        <br /> {/* Espaçamento para o Semantic UI */}
      </Form>
    );
  }
}

export default FormPropriedade;
