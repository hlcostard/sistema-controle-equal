const asyncHandler = require("express-async-handler")

const Aluno = require("../models/alunoModel")

// @desc   lista todos os alunos
// @route  GET /api/alunos
// @access Private
const getAlunos = asyncHandler(async (req, res) => {
  const alunos = await Aluno.find({})
  res.status(200).json(alunos)
})

// @desc   lista 1 aluno
// @route  GET /api/alunos/:id
// @access Private
const getAluno = asyncHandler(async (req, res) => {
  const aluno = await Aluno.findById(req.params.id)
  if (!aluno) {
    res.status(400)
    throw new Error("Aluno não encontrado")
  }

  res.status(200).json(aluno)
})

// @desc   cria um novo alunos
// @route  POST /api/alunos
// @access Private
const createAluno = asyncHandler(async (req, res) => {
  const { nome, email, telefone, responsavel, preco } = req.body
  if (!nome) {
    res.status(400)
    throw new Error("Please add an name field")
  }

  const aluno = await Aluno.create({
    nome,
    email,
    telefone,
    responsavel,
    preco,
  })
  res.status(200).json(aluno)
})

// @desc   atualiza um aluno
// @route  PUT /api/alunos/:id
// @access Private
const updateAluno = asyncHandler(async (req, res) => {
  const aluno = await Aluno.findById(req.params.id)

  if (!aluno) {
    res.status(400)
    throw new Error("aluno não encontrado")
  }

  const alunoAtualizado = await Aluno.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.status(200).json(alunoAtualizado)
})

// @desc   deleta um aluno
// @route  DELETE /api/alunos/:id
// @access Private
const deleteAluno = asyncHandler(async (req, res) => {
  const aluno = await Aluno.findById(req.params.id)

  if (!aluno) {
    res.status(400)
    throw new Error("Aluno não encontrado")
  }

  await aluno.remove()
  res
    .status(200)
    .json({ _id: req.params.id, message: "aluno excluido com sucesso" })
})

module.exports = {
  getAlunos,
  getAluno,
  createAluno,
  updateAluno,
  deleteAluno,
}
