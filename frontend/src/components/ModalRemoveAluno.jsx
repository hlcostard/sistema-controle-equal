import ReactDOM from "react-dom"
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { deleteAluno } from "../features/alunos/alunoSlice"

const ModalRemoveAluno = ({ setOpenModalRemove, aluno }) => {
  const ref = useRef()
  const dispatch = useDispatch()
  const { _id, nome } = aluno

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(deleteAluno(_id))
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenModalRemove(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [setOpenModalRemove])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return ReactDOM.createPortal(
    <div className='modalBackground'>
      <div className='modalContainer flow' ref={ref}>
        <div className='modalTitle'>
          <p>
            Confirme a exclusão do aluno:{" "}
            <span style={{ color: "red" }}> {nome}</span>
          </p>
        </div>
        <form className='modalFooter' onSubmit={onSubmit}>
          <div className='flex'>
            <button className='btn' onClick={() => setOpenModalRemove(false)}>
              Cancelar
            </button>
            <button className='btn btn-danger'>Deletar</button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root")
  )
}

export default ModalRemoveAluno
