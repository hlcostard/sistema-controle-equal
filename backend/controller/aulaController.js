const asyncHandler = require("express-async-handler")

const Aula = require("../models/aulaModel")

// @desc   lista todas aulas de um aluno
// @route  GET /api/alunos/:alunoId/aulas
// @access Private
const getAulas = asyncHandler(async (req, res) => {
  const aulas = await Aula.find({ aluno: req.params.alunoId })

  res.status(200).json(aulas)
})

// @desc   cria uma aula
// @route  POST /api/alunos/:alunoId/aulas
// @access Private
const createAula = asyncHandler(async (req, res) => {
  const aluno = req.params.alunoId
  const { tema, horas, data, observacoes, pago } = req.body

  if (!aluno || !tema || !horas || !data) {
    res.status(400)
    throw new Error("favor preencher todos os campos obrigatorios")
  }

  const aula = await Aula.create({
    aluno,
    tema,
    horas,
    data,
    observacoes,
    pago,
  })
  res.status(200).json(aula)
})

// @desc   atualiza uma aula
// @route  PUT /api/alunos/:alunoId/aulas/:aulaId
// @access Private
const updateAula = asyncHandler(async (req, res) => {
  const aula = await Aula.findById(req.params.aulaId)

  if (!aula) {
    res.status(400)
    throw new Error("Aula não encontrada")
  }

  const aulaAtualizada = await Aula.findByIdAndUpdate(
    req.params.aulaId,
    req.body,
    {
      new: true,
    }
  )
  res.status(200).json(aulaAtualizada)
})

// @desc   deleta uma aula
// @route  DELETE /api/alunos/:alunoId/aulas/:aulaId
// @access Private
const deleteAula = asyncHandler(async (req, res) => {
  const aula = await Aula.findById(req.params.aulaId)

  if (!aula) {
    res.status(400)
    throw new Error("Aula não encontrada")
  }

  await aula.remove()

  res
    .status(200)
    .json({ _id: req.params.aulaId, message: "aula deletada com sucesso" })
})

module.exports = {
  getAulas,
  createAula,
  updateAula,
  deleteAula,
}
