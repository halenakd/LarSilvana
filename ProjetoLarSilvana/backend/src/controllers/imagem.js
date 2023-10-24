const router = require("express").Router();

const Imagem = require("../dataBase/models/imagem");

const getImagens = async (req, res) => {
    try {
        const imagens = await Imagem.find();

        return res.json(imagens);

    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar imagens.' });
    }
};

const createImagem = async (req, res) => {
    try {
        const { originalname: name, size, key, location: url = "" } = req.file;

        const imagem = await Imagem.create({
            name,
            size,
            key,
            url
        });

        return res.json(imagem);

    } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Erro ao criar a imagem.' });
  }
};

const deleteImagem = async (req, res) => {
    try {

        const removedImagem = await Imagem.findOneAndDelete({_id: req.params.imagemID});
        res.status(200).json(removedImagem);

        /*const imagem = await Imagem.findById(req.params.imagemID);

        if (!imagem) {
            return res.status(404).json({ error: 'Imagem não encontrada.' });
        }

        await imagem.remove();

        console.log('Imagem removida');*/

        return res.send();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao excluir a imagem.' });
    }

};

module.exports = {
    getImagens,
    createImagem,
    deleteImagem
};