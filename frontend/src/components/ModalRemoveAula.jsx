import ReactDOM from "react-dom"
import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { deleteAula } from "../features/aulas/aulasSlice"

const ModalRemoveAula = ({ setOpenModalRemoveAula, aula, alunoId }) => {
  const ref = useRef()
  const dispatch = useDispatch()
  const { _id, tema } = aula

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(deleteAula({ alunoId, _id }))
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenModalRemoveAula(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [setOpenModalRemoveAula])

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
            Confirme a exclusão da aula:{" "}
            <span style={{ color: "red" }}> {tema}</span>
          </p>
        </div>
        <form className='modalFooter' onSubmit={onSubmit}>
          <button className='btn' onClick={() => setOpenModalRemoveAula(false)}>
            Cancelar
          </button>
          <button className='btn btn-danger'>Deletar</button>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root")
  )
}

export default ModalRemoveAula
