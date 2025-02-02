const express = require("express");
const mongoose = require("mongoose");
const auth = require("./middlewares/auth.js")
const usersRouter = require("./routes/users.js");
const cardsRouter = require("./routes/cards.js");
const app = express();
const { requestLogger, errorLogger } = require("./middlewares/logger.js");
require("dotenv").config();

const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/aroundb", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado ao MongoDB!"))
  .catch((err) => {
    console.error("Erro de conexão com o MongoDB:", err);
    process.exit(1); // Encerra a aplicação caso a conexão falhe
  });

app.get("/", (req, res) => {
  res.send("Bem-vindo à API!");
});

app.use(express.json());
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((err, req, res, next) => {
  console.error(err); // Exibe o erro no console
  res.status(err.statusCode || 500).json({ message: err.message || 'Erro interno no servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
