const multer = require("multer");
const multerConfig = require("../config/multer");

// importa o modulo cachorroController com as funcoes definindo o comportamento para as operacoes CRUD relacionadas a Cachorro
const ImagemController = require("../controllers/imagem");

// importa o express
const express = require("express");
const router = express.Router();

// definição das rotas do cachorro para as operacoes CRUD
// cada rota eh associada a uma funcao correspondente no cachorroController
router.get('/', ImagemController.getImagens); // lista todos os registros
//router.get('/:imagemID', ImagemController.getImagem); // lista um registro especifico
router.post('/', multer(multerConfig).single("file"), ImagemController.createImagem); // cadastra um novo registro
router.delete('/:imagemID', ImagemController.deleteImagem); // remove um registro especifico

module.exports = router; // exporta o roteador