import ReactDOM from "react-dom"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { createAula } from "../features/aulas/aulasSlice"

const ModalAddAula = ({ setOpenModalAddAula, alunoId }) => {
  const [tema, setTema] = useState("")
  const [horas, setHoras] = useState("")
  const [data, setData] = useState("")
  const [obs, setObs] = useState("")
  const [pago, setPago] = useState(false)
  const ref = useRef()
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createAula({
        alunoId: alunoId,
        tema: tema,
        horas: horas,
        data: data,
        observacoes: obs,
        pago: pago,
      })
    )
    setTema("")
    setHoras("")
    setData("")
    setObs("")
    setPago(false)
    setOpenModalAddAula(false)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenModalAddAula(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [setOpenModalAddAula])

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
          <h2>Adicionar Aula</h2>
        </div>

        <form className='form flow' onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='tema'>Tema: </label>
            <input
              type='text'
              name='tema'
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='horas'>Horas: </label>
            <input
              type='text'
              name='horas'
              value={horas}
              onChange={(e) => setHoras(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='data'>Data: </label>
            <input
              type='date'
              name='data'
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='pago'>Pago: </label>
            <input
              type='checkbox'
              name='pago'
              checked={pago}
              onChange={(e) => setPago(e.target.checked)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='obs'>Observações: </label>
            <input
              type='text'
              name='obs'
              value={obs}
              onChange={(e) => setObs(e.target.value)}
            />
          </div>
          <div className='modalFooter'>
            <button
              className='btn btn-danger'
              onClick={() => setOpenModalAddAula(false)}
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

export default ModalAddAula
