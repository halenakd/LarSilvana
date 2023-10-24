require("dotenv").config();
const porta = process.env.PORT || 3003;
const express = require('express');
const path = require("path");
const morgan = require("morgan");
const app = express(); // server
const bodyParser = require('body-parser');
const cors = require('cors'); // permite que o servidor responda a requisições de diferentes origens

// middlewares
// urlencoded: analisa os dados enviados em um formato de formulário HTML a partir de uma solicitação HTTP
app.use(bodyParser.urlencoded({ extended: true })); // garante que o middleware urlencoded seja aplicado a todas as rotas, por exemplo POST
app.use(express.json()); // adiciona o middleware express.json()
app.use(cors()); // adiciona o middleware cors()
app.use(morgan("dev"));

app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "uploads"))
);

app.use("/imagem", require("./routes/imagem"));

//define a rota base /cachorro para as rotas relacionadas a cachorros
app.use("/cachorro", require("./routes/cachorro"));

// inicializa o servidor
app.listen(porta, () => {
    console.log(`Servidor executando na porta ${porta}: http://localhost:${porta}/`)
});


module.exports = app; // exporta

// para rodar: npm start
// URL do servidor (segurar o CTRL e clicar em cima):
// http://localhost:3000/