import axios from "axios"

const API_URL = "/api/alunos/"

//criar novo alunos
const createAluno = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, data, config)
  return response.data
}

//lista todos alunos
const getAlunos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

// lista 1 aluno
const getAluno = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + id, config)
  return response.data
}

//deleta um aluno
const deleteAluno = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + id, config)
  return response.data
}

//atualiza um aluno
const updateAluno = async (id, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL + id, data, config)
  return response.data
}

const alunoService = {
  createAluno,
  getAlunos,
  getAluno,
  deleteAluno,
  updateAluno,
}

export default alunoService
