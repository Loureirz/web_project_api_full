const { Router } = require("express");
const { listCards, createCard, deleteCard, likeCard, dislikeCard } = require("../controllers/cards");
const router = new Router();


router.get("/", listCards);
router.post("/", createCard);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", dislikeCard);

module.exports = router;

