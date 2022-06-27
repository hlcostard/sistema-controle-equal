import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import Header from "./components/Header"
import Aluno from "./pages/Aluno"
import ChangePassword from "./pages/ChangePassword"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/aluno/:alunoId' element={<Aluno />} />
            <Route path='/alterarSenha' element={<ChangePassword />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
