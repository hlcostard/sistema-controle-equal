import axios from "axios"

//api/alunos/:alunoId/aulas/
const API_URL = "/api/alunos/"

//criar nova aula
const createAula = async (alunoId, aulaData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(
    API_URL + alunoId + "/aulas/",
    aulaData,
    config
  )
  return response.data
}

//lista todas aulas de 1 aluno
const getAulas = async (alunoId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + alunoId + "/aulas/", config)
  return response.data
}

//deleta uma aula
const deleteAula = async (alunoId, _id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(
    API_URL + alunoId + "/aulas/" + _id,
    config
  )
  return response.data
}

//atualiza uma aula
const updateAula = async (alunoId, _id, aulaData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    API_URL + alunoId + "/aulas/" + _id,
    aulaData,
    config
  )
  return response.data
}

const aulasService = {
  createAula,
  getAulas,
  deleteAula,
  updateAula,
}

export default aulasService
