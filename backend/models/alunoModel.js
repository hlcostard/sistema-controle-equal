const mongoose = require("mongoose")

const alunoSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "favor adicionar um nome"],
    },
    email: {
      type: String,
    },
    telefone: {
      type: String,
    },
    responsavel: {
      type: String,
    },
    preco: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Aluno", alunoSchema)
