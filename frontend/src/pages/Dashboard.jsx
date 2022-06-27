import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Spinner from "../components/Spinner"
import { getAlunos, reset } from "../features/alunos/alunoSlice"
import AlunosList from "../components/AlunosList"
import ModalAddAluno from "../components/ModalAddAluno"

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [openModalAdd, setOpenModalAdd] = useState(false)

  const { user } = useSelector((state) => state.auth)
  const { alunos, isLoading, isError, message } = useSelector(
    (state) => state.alunos
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate("/login")
    }

    dispatch(getAlunos())
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <h1 className='text-center'>Dashboard</h1>
      <section className='text-center'>
        <button className='btn' onClick={() => setOpenModalAdd(true)}>
          Adicionar Aluno
        </button>
        {openModalAdd && <ModalAddAluno setOpenModalAdd={setOpenModalAdd} />}
        {alunos.length > 0 ? (
          <AlunosList alunos={alunos} />
        ) : (
          <h3>Nenhum aluno cadastrado</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
