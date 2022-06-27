import AlunoItem from "./AlunoItem"

const AlunosList = ({ alunos }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Telefone</th>
          <th>Responsável</th>
          <th>Preço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {alunos.length > 0 &&
          alunos.map((aluno) => <AlunoItem key={aluno._id} aluno={aluno} />)}
      </tbody>
    </table>
  )
}

export default AlunosList
