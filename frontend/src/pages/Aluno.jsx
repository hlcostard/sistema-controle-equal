import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import AulaItem from "../components/AulaItem"
import ModalAddAula from "../components/ModalAddAula"
import Spinner from "../components/Spinner"
import { getAluno, reset } from "../features/alunos/alunoSlice"
import { getAulas } from "../features/aulas/aulasSlice"

const Aluno = () => {
  const [openModalAddAula, setOpenModalAddAula] = useState(false)
  const { alunoId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  const alunos = useSelector((state) => state.alunos.alunos)
  const alunosIsLoading = useSelector((state) => state.alunos.isLoading)
  const alunosIsError = useSelector((state) => state.alunos.isError)
  const alunosMessage = useSelector((state) => state.alunos.message)

  const aulas = useSelector((state) => state.aulas.aulas)
  const aulasIsLoading = useSelector((state) => state.aulas.isLoading)
  const aulasIsError = useSelector((state) => state.aulas.isError)
  const aulasMessage = useSelector((state) => state.aulas.message)

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }

    if (alunosIsError) {
      console.log(alunosMessage)
    }

    if (aulasIsError) {
      console.log(aulasMessage)
    }

    dispatch(getAluno(alunoId))
    dispatch(getAulas(alunoId))
    return () => {
      dispatch(reset)
    }
  }, [
    user,
    alunosIsError,
    alunosMessage,
    aulasIsError,
    aulasMessage,
    dispatch,
    navigate,
    alunoId,
  ])

  if (alunosIsLoading || aulasIsLoading) {
    return <Spinner />
  }

  return (
    <div className='text-center flow'>
      <div>
        <h2>Aluno: {alunos.nome}</h2>
        <p>Email: {alunos.email}</p>
        <p>Telefone: {alunos.telefone}</p>
        <p>Responsavel: {alunos.responsavel}</p>
        <p>Preço: R$ {alunos.preco},00</p>
      </div>
      <div className='flex flex-center'>
        <button className='btn' onClick={() => setOpenModalAddAula(true)}>
          Adicionar Aula
        </button>
      </div>
      {openModalAddAula && (
        <ModalAddAula
          setOpenModalAddAula={setOpenModalAddAula}
          alunoId={alunoId}
        />
      )}
      {aulas.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Tema</th>
              <th>Horas</th>
              <th>Data</th>
              <th>Observações</th>
              <th>Total</th>
              <th>Pago</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {aulas.map((aula) => (
              <AulaItem
                key={aula._id}
                aula={aula}
                alunoId={alunoId}
                preco={alunos.preco}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <h4>Nenhuma aula encontrada</h4>
      )}
    </div>
  )
}

export default Aluno
