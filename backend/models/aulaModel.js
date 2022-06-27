const mongoose = require("mongoose")

const aulaSchema = mongoose.Schema(
  {
    aluno: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Aluno",
    },
    tema: {
      type: String,
      required: true,
    },
    horas: {
      type: Number,
      required: true,
    },
    data: {
      type: Date,
      required: true,
    },
    observacoes: {
      type: String,
    },
    pago: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Aula", aulaSchema)
