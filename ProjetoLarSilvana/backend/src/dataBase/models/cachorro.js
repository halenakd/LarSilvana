const db = require('../dataBase.js'); // importa o modulo que fizemos a conexao com o db
const {Schema} = db; // definicao do esquema do db usando o mongoose

// definindo o modelo Cachorro com seus campos
const Cachorro = db.model('Cachorro', new Schema({
    nome: String,
    descricao: String,
    imagemUrl: String
}));

// exportando para utilizar em outras partes do codigo para manipular esse esquema e interagir com o db
module.exports = Cachorro;