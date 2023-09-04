import {useState, useEffect} from 'react';
import axios from 'axios';

export default function Adotar() {
    const [cachorros, setCachorros] = useState([])

    async function fetchCachorros() {
        try {
            const response = await axios.get('http://localhost:3003/cachorro');
            console.log(response.data);
            setCachorros(response.data);
        } catch (error) {
            console.error('Erro ao buscar cachorros', error);
            console.log(error.response);
        }
    }

    const [novoCachorro, setNovoCachorro] = useState({
            nome: "",
            descricao: "",
            imagemUrl: ""
        });

    async function registrarNovoCachorro(event) {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3003/cachorro', novoCachorro);
            // Atualizar a lista de cachorros após adicionar o novo
            fetchCachorros();
            // Limpar os campos do formulário
            setNovoCachorro({
                nome: "",
                descricao: "",
                imagemUrl: ""
            });
        } catch (error) {
            console.error('Erro ao registrar novo cachorro', error);
            console.log(error.response);
        }
    }

    async function deletarCachorro(id) {
        try {
            await axios.delete(`http://localhost:3003/cachorro/${id}`);
            fetchCachorros(); // Atualizar a lista após a exclusão
        } catch (error) {
            console.error('Erro ao deletar cachorro', error);
            console.log(error.response);
        }
    }

    useEffect(() => {
        fetchCachorros();
    }, [])

    return (
        <div>
          <h1>Adotar</h1>
          <div className="catalog">
                {cachorros.map(cachorro => (
                    <div key={cachorro._id} className="catalog-item">
                        <img src={cachorro.imagemUrl} alt={cachorro.nome} />
                        <h2>{cachorro.nome}</h2>
                        <p>{cachorro.descricao}</p>
                        <button onClick={() => deletarCachorro(cachorro._id)}>Deletar</button>
                        <button>Adotar</button>
                    </div>
                ))}
            </div>

            <div className="add-dog-form">
                <h2>Registrar Novo Cachorro</h2>
                <form onSubmit={registrarNovoCachorro}>
                    <label>
                        Nome:
                        <input
                            type="text"
                            name="nome"
                            value={novoCachorro.nome}
                            onChange={(e) => setNovoCachorro({ ...novoCachorro, nome: e.target.value })}
                        />
                    </label>
                    <label>
                        Descrição:
                        <textarea
                            name="descricao"
                            value={novoCachorro.descricao}
                            onChange={(e) => setNovoCachorro({ ...novoCachorro, descricao: e.target.value })}
                        />
                    </label>
                    <label>
                        URL da Imagem:
                        <input
                            type="text"
                            name="imagemUrl"
                            value={novoCachorro.imagemUrl}
                            onChange={(e) => setNovoCachorro({ ...novoCachorro, imagemUrl: e.target.value })}
                        />
                    </label>
                    <button type="submit">Registrar</button>
                </form>
            </div>
        </div>
      );
}