import ReactDOM from "react-dom"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { updateAluno } from "../features/alunos/alunoSlice"

const ModalEditAluno = ({ setOpenModalEdit, aluno }) => {
  const { _id, nome, email, telefone, responsavel, preco } = aluno
  const [nomeNovo, setNomeNovo] = useState(nome)
  const [emailNovo, setEmailNovo] = useState(email)
  const [telNovo, setTelNovo] = useState(telefone)
  const [respNovo, setRespNovo] = useState(responsavel)
  const [precoNovo, setPrecoNovo] = useState(preco)
  const ref = useRef()
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(
      updateAluno({
        id: _id,
        nome: nomeNovo,
        email: emailNovo,
        telefone: telNovo,
        responsavel: respNovo,
        preco: precoNovo,
      })
    )
    setNomeNovo("")
    setEmailNovo("")
    setTelNovo("")
    setRespNovo("")
    setPrecoNovo("")
    setOpenModalEdit(false)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenModalEdit(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [setOpenModalEdit])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return ReactDOM.createPortal(
    <div className='modalBackground'>
      <div className='modalContainer flow' ref={ref}>
        <div className='text-center'>
          <h2>Editar Aluno</h2>
        </div>

        <form className='form flow' onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='nome'>Nome: </label>
            <input
              type='text'
              name='nome'
              value={nomeNovo}
              onChange={(e) => setNomeNovo(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email: </label>
            <input
              type='text'
              name='email'
              value={emailNovo}
              onChange={(e) => setEmailNovo(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='tel'>Telefone: </label>
            <input
              type='text'
              name='tel'
              value={telNovo}
              onChange={(e) => setTelNovo(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='resp'>Responsavel: </label>
            <input
              type='text'
              name='resp'
              value={respNovo}
              onChange={(e) => setRespNovo(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='preco'>Preço: </label>
            <input
              type='text'
              name='preco'
              value={precoNovo}
              onChange={(e) => setPrecoNovo(e.target.value)}
              required
            />
          </div>
          <div className='modalFooter'>
            <button
              className='btn btn-danger'
              onClick={() => setOpenModalEdit(false)}
            >
              Cancelar
            </button>
            <button className='btn btn-ok'>Confirmar</button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root")
  )
}

export default ModalEditAluno
