// importa o modulo cachorroController com as funcoes definindo o comportamento para as operacoes CRUD relacionadas a Cachorro
const cachorroController = require("../controllers/cachorro");

// importa o express
const express = require("express");
const router = express.Router();

// definição das rotas do cachorro para as operacoes CRUD
// cada rota eh associada a uma funcao correspondente no cachorroController
router.get('/', cachorroController.getCachorros); // lista todos os registros
router.get('/:cachorroID', cachorroController.getCachorro); // lista um registro especifico
router.post('/', cachorroController.createCachorro); // cadastra um novo registro
router.put('/:cachorroID', cachorroController.updateCachorro); // atualiza um registro existente
router.delete('/:cachorroID', cachorroController.deleteCachorro); // remove um registro especifico

module.exports = router; // exporta o roteador