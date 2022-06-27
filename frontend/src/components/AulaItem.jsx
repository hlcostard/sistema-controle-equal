import { useState } from "react"
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa"
import ModalEditAula from "./ModalEditAula"
import ModalRemoveAula from "./ModalRemoveAula"

const AulaItem = ({ aula, alunoId, preco }) => {
  const [openModalEditAula, setOpenModalEditAula] = useState(false)
  const [openModalRemoveAula, setOpenModalRemoveAula] = useState(false)

  const parseDateLocal = (date) => {
    let newDate =
      date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4)
    return newDate
  }

  return (
    <tr>
      <td>{aula.tema}</td>
      <td>{aula.horas}</td>
      <td>{parseDateLocal(aula.data)}</td>
      <td>{aula.observacoes}</td>
      <td>R$ {aula.horas * preco},00</td>
      <td style={{ backgroundColor: aula.pago ? "palegreen" : "tomato" }}>
        {aula.pago ? <FaCheck /> : <FaTimes />}
      </td>
      <td>
        <button className='btn-icon' onClick={() => setOpenModalEditAula(true)}>
          <FaEdit />
        </button>
        {openModalEditAula && (
          <ModalEditAula
            setOpenModalEditAula={setOpenModalEditAula}
            aula={aula}
            alunoId={alunoId}
          />
        )}
        <button
          className='btn-icon'
          onClick={() => setOpenModalRemoveAula(true)}
        >
          <FaTrash />
        </button>
        {openModalRemoveAula && (
          <ModalRemoveAula
            setOpenModalRemoveAula={setOpenModalRemoveAula}
            aula={aula}
            alunoId={alunoId}
          />
        )}
      </td>
    </tr>
  )
}

export default AulaItem
