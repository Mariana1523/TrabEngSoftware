import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import io from "socket.io-client";

import TablePropriedade from "../TablePropriedade/TablePropriedade";
import ModalPropriedade from "../ModalPropriedade/ModalPropriedade";

import logo from "../../mern-logo.png";
import shirts from "../../shirts.png";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.server = process.env.REACT_APP_API_URL || "";
    this.socket = io(this.server);

    this.state = {
      propriedades: [],
      online: 0,
    };

    this.fetchPropriedade = this.fetchPropriedade.bind(this);
    this.handlePropriedadeAdded = this.handlePropriedadeAdded.bind(this);
    this.handlePropriedadeUpdated = this.handlePropriedadeUpdated.bind(this);
    this.handlePropriedadeDeleted = this.handlePropriedadeDeleted.bind(this);
  }

  // Place socket.io code inside here
  componentDidMount() {
    this.fetchPropriedade();
    this.socket.on("visitor enters", (data) => this.setState({ online: data }));
    this.socket.on("visitor exits", (data) => this.setState({ online: data }));
    this.socket.on("add", (data) => this.handlePropriedadeAdded(data));
    this.socket.on("update", (data) => this.handlePropriedadeUpdated(data));
    this.socket.on("delete", (data) => this.handlePropriedadeDeleted(data));
  }

  // Fetch data from the back-end

  fetchPropriedade() {
    axios
      .get(`${this.server}/api/`)
      .then((response) => {
        console.log(response);
        this.setState({ propriedades: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handlePropriedadeAdded(propriedade) {
    let propriedades = this.state.propriedades.slice();
    propriedades.push(propriedade);
    this.setState({ propriedades: propriedades });
  }

  handlePropriedadeUpdated(propriedade) {
    let propriedades = this.state.propriedades.slice();

    let i = propriedades.findIndex((u) => u._id === propriedade._id);

    if (propriedades.length > i) {
      propriedades[i] = propriedade;
    }

    this.setState({ propriedades: propriedades });
  }

  handlePropriedadeDeleted(propriedade) {
    let propriedades = this.state.propriedades.slice();
    propriedades = propriedades.filter((u) => {
      return u._id !== propriedade._id;
    });
    this.setState({ propriedades: propriedades });
  }

  render() {
    let peopleOnline = this.state.online - 1;
    let onlineText = "";

    if (peopleOnline < 1) {
      onlineText = "No one else is online";
    } else {
      onlineText =
        peopleOnline > 1
          ? `${this.state.online - 1} people are online`
          : `${this.state.online - 1} person is online`;
    }

    return (
      <div>
        <div className="App">
          <div className="App-header">
            <h1 className="App-intro">Imobiliária</h1>
            <p>
              Locação de Imovóveis
              <br />
            </p>
          </div>
        </div>
        <Container>
          <ModalPropriedade
            headerTitle="Adiconar Imóvel"
            buttonTriggerTitle="Add New"
            buttonSubmitTitle="Add"
            buttonColor="green"
            onPropriedadeAdded={this.handlePropriedadeAdded}
            server={this.server}
            socket={this.socket}
          />
          <em id="online">{onlineText}</em>
          <TablePropriedade
            onPropriedadeUpdated={this.handlePropriedadeUpdated}
            onPropriedadeDeleted={this.handlePropriedadeDeleted}
            propriedade={this.state.propriedades}
            server={this.server}
            socket={this.socket}
          />
        </Container>
        <br />
      </div>
    );
  }
}

export default App;
