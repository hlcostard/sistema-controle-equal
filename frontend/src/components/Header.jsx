import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { FaTimes, FaBars } from "react-icons/fa"
import { logout, reset } from "../features/auth/authSlice"
import logo from "../img/logo.png"

const Header = () => {
  const [toogleNav, setToogleNav] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/login")
  }

  return (
    <header className='flex header'>
      <div className='flex logo'>
        <Link className='fs-700' to='/'>
          <img src={logo} alt='sinal de igual' />
        </Link>
      </div>
      {user && (
        <div className='flex'>
          <button
            className={`mobile-nav-toogle ${toogleNav ? "nav-active" : ""}`}
            onClick={() => setToogleNav(!toogleNav)}
          >
            {toogleNav ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <nav className={`flex navigation ${toogleNav ? "show-menu" : ""}`}>
            <Link
              className='btn'
              to='/'
              onClick={() => setToogleNav(!toogleNav)}
            >
              Home
            </Link>
            <button className='btn' onClick={onLogout}>
              Sair
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
