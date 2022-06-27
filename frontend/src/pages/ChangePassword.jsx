import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import { updateUser } from "../features/auth/authSlice"

const ChangePassword = () => {
  const [password, setPassword] = useState("")
  const [checkPassword, setCheckPassword] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [user, isError, isSuccess, message])

  const onSubmit = (e) => {
    e.preventDefault()
    if (checkPassword !== password) {
      alert("senhas não são iguais")
    } else {
      dispatch(updateUser({ username: user.username, password: password }))
      navigate("/")
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <form className='form flow' onSubmit={onSubmit}>
      <h2>Alterar senha</h2>
      <div>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          placeholder='senha'
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type='password'
          id='checkPassword'
          name='checkPassword'
          value={checkPassword}
          placeholder='confirme senha'
          onChange={(e) => setCheckPassword(e.target.value)}
        />
      </div>
      <button className='btn'>Confirmar</button>
    </form>
  )
}

export default ChangePassword
