const { Router } = require("express");
const { listCards, createCard, deleteCard, likeCard, dislikeCard } = require("../controllers/cards");
const auth = require("../middlewares/auth");
const router = new Router();


router.get("/", auth, listCards);
router.post("/", auth, createCard);
router.delete("/:cardId", auth, deleteCard);
router.put("/:cardId/likes", auth, likeCard);
router.delete("/:cardId/likes", auth, dislikeCard);

module.exports = router;

