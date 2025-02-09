const express = require("express");
const mongoose = require("mongoose");
const auth = require("./middlewares/auth.js");
const cors = require("cors");
const usersRouter = require("./routes/users.js");
const cardsRouter = require("./routes/cards.js");
const app = express();
const { requestLogger, errorLogger } = require("./middlewares/logger.js");
require("dotenv").config();

app.use(cors());
/*app.options('*', cors());*/
app.use(express.json());

mongoose.connect(process.env.CONNECTION)
  .then(() => console.log("Banco de dados conectado!"))
  .catch((err) => {
    console.error("Erro de conexão com o MongoDB:", err);
    process.exit(1); // Encerra a aplicação caso a conexão falhe
  });

const { PORT = 3000 } = process.env;

app.use(requestLogger);

app.use(function (req, res, next) {
  console.log("Teste:", req.path);
  if (req.path === '/users/signin' || req.path === '/users/signup') {
    return next();
  } else {
    return auth(req, res, next);
  }
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use(errorLogger);

app.use((err, req, res, next) => {
  console.error(err); // Exibe o erro no console
  res.status(err.statusCode || 500).json({ message: err.message || 'Erro interno no servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
