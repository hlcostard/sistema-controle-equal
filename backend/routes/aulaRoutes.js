const express = require("express")
const router = express.Router({ mergeParams: true })
const {
  getAulas,
  createAula,
  updateAula,
  deleteAula,
} = require("../controller/aulaController")
const { protect } = require("../middleware/authMiddleware")

router.route("/").get(protect, getAulas).post(protect, createAula)
router.route("/:aulaId").put(protect, updateAula).delete(protect, deleteAula)

module.exports = router
