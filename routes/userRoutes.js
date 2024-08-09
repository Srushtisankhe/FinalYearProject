const express = require("express");
const {
  deleteUser,
  getUserInfo,
  getUserRecords,
  signIn,
  signUp,
  updateUser,
} = require("../controllers/userController");
const { authenticate, isAdmin } = require("../middlewares/auth");
const router = express.Router();

router.get("/", authenticate, isAdmin, getUserRecords);

// user
router.get("/info", authenticate, getUserInfo);
router.delete("/:user_id", authenticate, deleteUser);
router.put("/:user_id", authenticate, updateUser);
router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;
