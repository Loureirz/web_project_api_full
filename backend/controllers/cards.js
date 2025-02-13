const Card = require("../models/card");

module.exports = {

  listCards: (req, res, next) => {
    Card.find({})
      .populate(["owner"])
      .then((cards) => res.status(200).json(cards))
      .catch(next);
  },

  createCard: (req, res) => {
    const { name, link, owner } = req.body;

    if (!name || !link || !owner) {
      return res.status(400).send({ message: "Dados inválidos" });
    }

    Card.create({ name, link, owner })
      .then((card) => res.send({ data: card }))
      .catch((err) => {
        res.status(500).send({ message: "Erro no servidor ao criar um card" + err });
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
      { $addToSet: { likes: req.user.id } },
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
      { $pull: { likes: req.user.id } },
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
