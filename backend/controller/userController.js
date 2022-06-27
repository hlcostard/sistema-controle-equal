const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

// @desc   Register new user
// @route  POST /api/users
// @acess  Private
const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  //check if user exists
  const userExists = await User.findOne({ username })
  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //create user
  const user = await User.create({
    username,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// @desc   Authenticate an user
// @route  POST /api/users/login
// @acess  Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  //check for username
  const user = await User.findOne({ username })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid credentials")
  }
})

// @desc   update an user
// @route  PUT /api/users
// @acess  Private
const updateUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  //check if user exists
  const userExists = await User.findOne({ username })
  if (userExists) {
    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //update user
    const user = await User.findOneAndUpdate(
      { username },
      {
        password: hashedPassword,
      }
    )

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
      })
    } else {
      res.status(400)
      throw new Error("Invalid user data")
    }
  }
})

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  })
}

module.exports = {
  registerUser,
  loginUser,
  updateUser,
}
