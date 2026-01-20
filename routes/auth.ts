import express from "express";
import { loginUser, registerUser } from "../controllers/authController";
const router = express.Router();

// router.route("/").post((req, res) => {
//   const { email, password } = req.body;

//   res.status(200).json({
//     email,
//     password,
//   });
// });
router.route("/").post(loginUser);

router.route("/register").post(registerUser);

module.exports = router;
