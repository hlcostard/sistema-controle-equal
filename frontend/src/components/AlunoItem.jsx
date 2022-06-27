import { useState } from "react"
import { FaEdit, FaTrash, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import ModalEditAluno from "./ModalEditAluno"
import ModalRemoveAluno from "./ModalRemoveAluno"

const AlunoItem = ({ aluno }) => {
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalRemove, setOpenModalRemove] = useState(false)

  return (
    <tr>
      <td>
        <Link to={`/aluno/${aluno._id}`}>{aluno.nome}</Link>
      </td>
      <td>{aluno.email}</td>
      <td>{aluno.telefone}</td>
      <td>{aluno.responsavel}</td>
      <td>R$ {aluno.preco},00</td>
      <td>
        <Link className='btn btn-icon' to={`/aluno/${aluno._id}`}>
          <FaUser />
        </Link>
        <button className='btn-icon' onClick={() => setOpenModalEdit(true)}>
          <FaEdit />
        </button>
        {openModalEdit && (
          <ModalEditAluno setOpenModalEdit={setOpenModalEdit} aluno={aluno} />
        )}
        <button className='btn-icon' onClick={() => setOpenModalRemove(true)}>
          <FaTrash />
        </button>
        {openModalRemove && (
          <ModalRemoveAluno
            setOpenModalRemove={setOpenModalRemove}
            aluno={aluno}
          />
        )}
      </td>
    </tr>
  )
}

export default AlunoItem
