import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImagemFormulario from '../assets/images/imagem_formulario.png';
import StarRating from '../funcionalidades/StarRating';


function CadastroMissao() {
    const [herois, setHerois] = useState([]);
    const [viloes, setViloes] = useState([]);
    const [locais, setLocais] = useState([]);
    const [dificuldade, setDificuldade] = useState(1);

    const [selectedHerois, setSelectedHerois] = useState(["", "", "", "", ""]);
    const [numHerois, setNumHerois] = useState(1); // quantidade de selects visíveis
    const [selectedVilao, setSelectedVilao] = useState('');
    const [selectedLocal, setSelectedLocal] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);



    useEffect(() => {
        axios.get('http://localhost:8080/api/mutantes')
            .then(res => setHerois(res.data.filter(m => m.tipo === 'heroi')))
            .catch(err => console.error(err));

        axios.get('http://localhost:8080/api/viloes')
            .then(res => setViloes(res.data))
            .catch(err => console.error(err));

        axios.get('http://localhost:8080/api/locais')
            .then(res => setLocais(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleHeroiChange = (index, value) => {
        const newHerois = [...selectedHerois];
        newHerois[index] = value;
        setSelectedHerois(newHerois);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Pelo menos o primeiro herói precisa estar selecionado
        if (!selectedVilao || !selectedLocal || !selectedHerois[0]) {
            alert('Selecione vilão, local e pelo menos 1 herói.');
            return;
        }

        // Remove heróis vazios antes de enviar
        const heroIds = selectedHerois.slice(0, numHerois).filter(h => h);

        setIsSubmitting(true);

        axios.post('http://localhost:8080/api/missoes', {
            idVilao: selectedVilao,
            idLocal: selectedLocal,
            idHerois: heroIds,
            dificuldade: dificuldade
        })
            .then(() => {
                alert('Missão cadastrada com sucesso!');
                setSelectedHerois(["", "", "", "", ""]);
                setSelectedVilao('');
                setSelectedLocal('');
                setNumHerois(1); // reset para 1 select
            })
            .catch(err => {
                console.error(err);
                alert('Erro ao cadastrar missão.');
            })
            .finally(() => setIsSubmitting(false));
    };

    return (
        <section id="cadastro-missao" className="container secao-cadastro-missao">
            <div className="cartao cartao-cadastro-missao">
                <div className="cartao-cadastro-missao__banner">
                    <img src={ImagemFormulario} alt="Imagem de um ambiente de sala de estar moderno" />
                </div>
                <div className="cartao-cadastro-missao__conteudo">
                    <div className="cartao-cadastro-missao__texto">
                        <div className="cartao-descricao">
                            <h3>Cadastre uma nova Missão:</h3>
                            <div className="cartao-texto">
                                {`O alerta foi acionado! Prepare a operação e mobilize sua equipe.Selecione o local sob ataque, identifique o vilão responsável e convoque até cinco heróis para formar sua força-tarefa.
                                Cada missão pode mudar o destino entre humanos e mutantes.Planeje sua estratégia, ajuste o nível de dificuldade e garanta que a equipe esteja pronta para enfrentar o desafio.Suas decisões moldam a reputação dos X-Men e definem quem ocupará o topo entre os 3 heróis mais ativos do Instituto Xavier.`.split("\n").map((linha, index) => (
                                    <span key={index}>
                                        {linha}
                                        <br />
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className='herois-botoes-texto'>
                            <div className="grupo-formulario">
                                <label>Número de Heróis:</label>
                            </div>
                            <div className="herois-botoes">
                                {[1, 2, 3, 4, 5].map(n => (
                                    <button
                                        key={n}
                                        type="button"
                                        className={`botao selecionar-herois ${numHerois === n ? 'ativo' : ''}`}
                                        onClick={() => {
                                            setNumHerois(n);
                                            // Limpa as seleções dos selects visíveis
                                            const newHerois = ["", "", "", "", ""];
                                            setSelectedHerois(newHerois);
                                        }}
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                    <div className="cartao-cadastro-missao__formulario">
                        <form onSubmit={handleSubmit}>
                            <div className="grupo-formulario">
                                <label>Heróis:</label>
                                <div className="herois-selects">
                                    {selectedHerois.slice(0, numHerois).map((h, index) => (
                                        <select
                                            key={index}
                                            value={h}
                                            onChange={e => handleHeroiChange(index, e.target.value)}
                                            required={index < numHerois} // todos os selects visíveis são obrigatórios
                                        >
                                            <option value="">
                                                {"Selecione um herói"}
                                            </option>
                                            {herois.map(hero => (
                                                <option key={hero.idMutante} value={hero.idMutante}>{hero.alterEgo}</option>
                                            ))}
                                        </select>
                                    ))}
                                </div>
                            </div>

                            <div className="formulario-linha">
                                <div className="grupo-formulario">
                                    <label>Vilão:</label>
                                    <select value={selectedVilao} onChange={e => setSelectedVilao(e.target.value)} required>
                                        <option value="">Selecione um vilão</option>
                                        {viloes.map(v => (
                                            <option key={v.idVilao} value={v.idVilao}>{v.alterEgo}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grupo-formulario">
                                    <label>Local:</label>
                                    <select value={selectedLocal} onChange={e => setSelectedLocal(e.target.value)} required>
                                        <option value="">Selecione um local</option>
                                        {locais.map(l => (
                                            <option key={l.idLocal} value={l.idLocal}>{l.nomeLocal}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grupo-formulario">
                                <label>Dificuldade da missão:</label>
                                <StarRating
                                    value={dificuldade}
                                    size={32}
                                    onClick={(n) => setDificuldade(n)}
                                    interactive
                                />
                            </div>


                            <button type="submit" className="botao botao-cadastro-missao" disabled={isSubmitting}>
                                {isSubmitting ? 'Enviando...' : 'Cadastrar Missão'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CadastroMissao;
