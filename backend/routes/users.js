const { Router } = require("express");
const { listUsers, getUserById, createUser, updateProfile, updateAvatar, login } = require("../controllers/users");
const router = new Router();

router.post("/signin", login);
router.post("/signup", createUser);

router.get("/", listUsers);
router.get("/me", getUserById);
router.patch("/me", updateProfile);
router.patch("/me/avatar", updateAvatar);

module.exports = router;