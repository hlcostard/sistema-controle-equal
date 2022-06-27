const express = require("express")
const router = express.Router()

const {
  registerUser,
  loginUser,
  updateUser,
} = require("../controller/userController")
const { protect } = require("../middleware/authMiddleware")

router.route("/").post(registerUser).put(protect, updateUser)
router.post("/login", loginUser)

module.exports = router
