const Card = require("../models/card");

module.exports = {

  listCards: (req, res, next) => {
    Card.find({})
      .populate(["owner", "likes"])
      .then((cards) => res.status(200).json(cards))
      .catch(next);
  },

  createCard: (req, res, next) => {
    const owner = req.user._id;
    const { name, link } = req.body;

    Card.create({ name, link, owner })
      .then((card) => res.status(201).json(card))
      .catch((err) => {
        if (err.name === "ValidationError") {
          return res.status(400).json({ error: "Dados inválidos", details: err.message });
        }
        next(err);
      });
  },

  deleteCard: (req, res, next) => {
    const { cardId } = req.params;

    Card.findByIdAndDelete(cardId)
      .orFail(() => {
        const error = new Error("Cartão não encontrado");
        error.statusCode = 404;
        throw error;
      })
      .then(() => res.status(200).json({ message: "Cartão deletado com sucesso" }))
      .catch((err) => {
        if (err.name === "CastError") {
          return res.status(400).json({ error: "ID inválido" });
        }
        next(err);
      });
  },

  likeCard: (req, res, next) => {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
      .orFail(() => {
        const error = new Error("Cartão não encontrado");
        error.statusCode = 404;
        throw error;
      })
      .then((updatedCard) => res.status(200).json(updatedCard))
      .catch((err) => {
        if (err.name === "CastError") {
          return res.status(400).json({ error: "ID inválido" });
        }
        next(err);
      });
  },

  dislikeCard: (req, res, next) => {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
      .orFail(() => {
        const error = new Error("Cartão não encontrado");
        error.statusCode = 404;
        throw error;
      })
      .then((updatedCard) => res.status(200).json(updatedCard))
      .catch((err) => {
        if (err.name === "CastError") {
          return res.status(400).json({ error: "ID inválido" });
        }
        next(err);
      });
  },
};
