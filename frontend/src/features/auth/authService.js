import axios from "axios"

const API_URL = "/api/users/"

//logout
const logout = () => {
  localStorage.removeItem("user")
}

//login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData)

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }
  return response.data
}

//update user
const updateUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL, userData, config)

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }
  return response.data
}

const authService = { logout, login, updateUser }

export default authService
