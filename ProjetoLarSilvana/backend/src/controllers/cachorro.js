const Cachorro = require("../dataBase/models/cachorro"); // importa o modelo Cachorro para executar operacoes no db

// lida com a busca de todos os cachorros no db com o .find() do mongoose
const getCachorros = async (req, res) => {
    // sucesso - retorna um JSON com os detalhes dos cachorros
    try {
        const cachorros = await Cachorro.find();
        res.json(cachorros);
    // erro - resposta de status 400 e o JSON contendo o erro
    } catch (error) {
        res.status(400).json({ error });
    }
};

// lida com a obtencao de um cachorro especifico no db com base no ID fornecido na solicitacao
const getCachorro = async (req, res) => {
    // sucesso - retorna os detalhes do cachorro encontrado em um JSON e o status 200
    try {
        const cachorro = await Cachorro.findById(req.params.cachorroID);
        res.status(200).json(cachorro);
    // erro - resposta de status 400 e o JSON contendo o erro
    } catch (error) {
        res.status(400).json({ error });
    }
};

// lida com a cricao de um novo cachorro no db
const createCachorro = async (req, res) => {
    // sucesso - retorna um JSON com os detalhes do cachorro que foi salvo no db e o status 201
    try {
        // com base nos dados fornecidos no corpo da solicitacao (req.body)
        const cachorro = new Cachorro(req.body); // novo documento com o modelo Cachorro
        const savedCachorro = await cachorro.save(); // salva no db
        res.status(201).json(savedCachorro);
    // erro - resposta de status 400 e o JSON contendo o erro
    } catch (error) {
        console.log(error)
        res.status(400).json({ error });
    }
};

/* lida com a atualizacao de um cachorro existente no db com o ID fornecido na solicitacao (req.params.cachorroID)
*  e com os dados fornecidos no corpo da solicitacao (req.body) */
const updateCachorro = async (req, res) => {
    // sucesso - retorna o cachorro como um JSON com status 200
    try {
        // usa a funcao findOneAndUpdate para encontrar e atualizar o cachorro
        const updatedCachorro = await Cachorro.findOneAndUpdate({_id: req.params.cachorroID}, req.body);
        res.status(200).json(updatedCachorro);
    // erro - resposta de status 400 e o JSON contendo o erro
    } catch (error) {
        res.status(400).json({ error });
    }
};

// lida com a exclusao de um cachorro do db com o ID fornecido na solicitacao (req.params.cachorroID)
const deleteCachorro = async (req, res) => {
    // sucesso - retorna o cachorro como um JSON com status 200
    try {
        // usa a funcao findOneAndDelete para encontrar e excluir o cachorro
        const removedCachorro = await Cachorro.findOneAndDelete({_id: req.params.cachorroID});
        res.status(200).json(removedCachorro);
    // erro - resposta de status 400 e o JSON contendo o erro
    } catch (error) {
        res.status(400).json({ error });
    }
};

/* exportando todas as funcoes como um objeto para poderem ser utilizadas em outras partes dos codigo
* que envolvem manipulacao de dados dos cachorros */
module.exports = {
    getCachorros,
    createCachorro,
    getCachorro,
    updateCachorro,
    deleteCachorro
}