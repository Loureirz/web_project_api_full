const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users.js");
const cardsRouter = require("./routes/cards.js");

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb").then(() => console.log("Connected to Database")).catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Bem-vindo à API!");
});

app.use(express.json());
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res) => {
  res.status(500).json({ message: "A solicitação não foi encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
