const mongoose = require('mongoose'); // biblioteca mongoose

// conexao com o banco de dados
// 127.0.0.1 -> localhost e 27017 -> porta
mongoose.connect('mongodb://127.0.0.1:27017/larSilvana', { useNewUrlParser: true, useUnifiedTopology: true })

// o connect vai retornar uma promise
// sucesso
.then(() => {
  console.log('Conexão estabelecida com o MongoDB');
})

// erro
.catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

// exportando para poder utilizar em outras partes do codigo
module.exports = mongoose;

// parte da conexao com o banco de dados