import ReactDOM from "react-dom"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { updateAula } from "../features/aulas/aulasSlice"

const ModalEditAula = ({ setOpenModalEditAula, aula, alunoId }) => {
  const { _id, tema, horas, data, observacoes, pago } = aula
  const [temaNovo, setTemaNovo] = useState(tema)
  const [horasNovo, setHorasNovo] = useState(horas)
  const [dataNovo, setDataNovo] = useState(data.toLocaleString().slice(0, 10))
  const [obsNovo, setObsNovo] = useState(observacoes)
  const [pagoNovo, setPagoNovo] = useState(pago)
  const ref = useRef()
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(
      updateAula({
        alunoId: alunoId,
        _id: _id,
        tema: temaNovo,
        horas: horasNovo,
        data: dataNovo,
        observacoes: obsNovo,
        pago: pagoNovo,
      })
    )
    setTemaNovo("")
    setHorasNovo("")
    setDataNovo("")
    setObsNovo("")
    setPagoNovo(false)
    setOpenModalEditAula(false)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenModalEditAula(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [setOpenModalEditAula])

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
          <h2>Editar Aula</h2>
        </div>

        <form className='form flow' onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='tema'>Tema: </label>
            <input
              type='text'
              name='tema'
              value={temaNovo}
              onChange={(e) => setTemaNovo(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='horas'>Horas: </label>
            <input
              type='text'
              name='horas'
              value={horasNovo}
              onChange={(e) => setHorasNovo(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='data'>Data: </label>
            <input
              type='date'
              name='data'
              value={dataNovo}
              onChange={(e) => setDataNovo(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='pago'>Pago: </label>
            <input
              type='checkbox'
              name='pago'
              checked={pagoNovo}
              onChange={(e) => setPagoNovo(e.target.checked)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='obs'>Observações: </label>
            <input
              type='text'
              name='obs'
              value={obsNovo}
              onChange={(e) => setObsNovo(e.target.value)}
            />
          </div>
          <div className='modalFooter'>
            <button
              className='btn btn-danger'
              onClick={() => setOpenModalEditAula(false)}
            >
              Cancelar
            </button>
            <button className='btn btn-ok'>Atualizar</button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root")
  )
}

export default ModalEditAula
