const express = require("express")
const router = express.Router()
const {
  getAlunos,
  getAluno,
  createAluno,
  updateAluno,
  deleteAluno,
} = require("../controller/alunoController")
const { protect } = require("../middleware/authMiddleware")

router.route("/").post(protect, createAluno).get(protect, getAlunos)
router
  .route("/:id")
  .get(protect, getAluno)
  .put(protect, updateAluno)
  .delete(protect, deleteAluno)

module.exports = router
