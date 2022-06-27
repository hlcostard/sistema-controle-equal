import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../features/auth/authSlice"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" })
  const { username, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate("/")
    }
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      username,
      password,
    }
    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section>
        <form className='form flow' onSubmit={onSubmit}>
          <h1>Login</h1>
          <div>
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              placeholder='username'
              onChange={onChange}
            />
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='password'
              onChange={onChange}
            />
          </div>
          <div>
            <button type='submit' className='btn btn-1'>
              Entrar
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
