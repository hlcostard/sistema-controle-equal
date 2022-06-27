import ReactDOM from "react-dom"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { createAluno } from "../features/alunos/alunoSlice"

const ModalAddAluno = ({ setOpenModalAdd }) => {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [tel, setTel] = useState("")
  const [resp, setResp] = useState("")
  const [preco, setPreco] = useState("")
  const ref = useRef()
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createAluno({
        nome: nome,
        email: email,
        telefone: tel,
        responsavel: resp,
        preco: preco,
      })
    )
    setNome("")
    setEmail("")
    setTel("")
    setResp("")
    setPreco("")
    setOpenModalAdd(false)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenModalAdd(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [setOpenModalAdd])

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
          <h2>Adicionar Aluno</h2>
        </div>

        <form className='form flow' onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='nome'>Nome: </label>
            <input
              type='text'
              name='nome'
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email: </label>
            <input
              type='text'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='tel'>Telefone: </label>
            <input
              type='text'
              name='tel'
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='resp'>Responsavel: </label>
            <input
              type='text'
              name='resp'
              value={resp}
              onChange={(e) => setResp(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='preco'>Preço: </label>
            <input
              type='text'
              name='preco'
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
            />
          </div>
          <div className='modalFooter'>
            <button
              className='btn btn-danger'
              onClick={() => setOpenModalAdd(false)}
            >
              Cancelar
            </button>
            <button className='btn btn-ok'>Adicionar</button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root")
  )
}

export default ModalAddAluno
