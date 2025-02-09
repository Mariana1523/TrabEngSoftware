const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");

const PropriedadeSchema = new mongoose.Schema({
  propertyType: {
    type: String,
    required: [true, "O tipo da propriedade é obrigatória."],
  },
  quartos: {
    type: Number,
    required: [true, "A quantidade de quartos é obrigatória."],
  },
  suites: {
    type: Number,
    required: [true, "A quantidade de suítes é obrigatória."],
  },
  salasEstar: {
    type: Number,
    required: [true, "A quantidade de salas de estar é obrigatória."],
  },
  salasJantar: {
    type: Number,
  },
  vagasGaragem: {
    type: Number,
    required: [true, "O número de vagas na garagem é obrigatório."],
  },
  area: {
    type: Number,
    required: [true, "A área do imóvel é obrigatória."],
  },
  armarioEmbutido: {
    type: Boolean,
    default: false,
  },
  descricao: {
    type: String,
  },
  foto: {
    type: String,
  },
  andar: {
    type: Number,
  },
  valorCondominio: {
    type: Number,
  },
  portaria24h: {
    type: Boolean,
    default: false,
  },
  bairro: {
    type: String,
  },
  valor: {
    type: Number,
  },
});

const Propriedade = mongoose.model("Propriedade", PropriedadeSchema);

module.exports = Propriedade;
