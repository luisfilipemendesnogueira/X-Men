import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImagemFormulario from '../assets/images/imagem_formulario.png';
import StarRating from '../funcionalidades/StarRating';

function CadastroMissao() {
    const [herois, setHerois] = useState([]);
    const [viloes, setViloes] = useState([]);
    const [locais, setLocais] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dificuldade, setDificuldade] = useState(1);
    const [selectedHerois, setSelectedHerois] = useState(["", "", "", "", ""]);
    const [numHerois, setNumHerois] = useState(1);
    const [selectedVilao, setSelectedVilao] = useState('');
    const [selectedLocal, setSelectedLocal] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        let isMounted = true;
        let intervalId;

        const fetchData = async () => {
            try {
                const [resMutantes, resViloes, resLocais] = await Promise.allSettled([
                    axios.get('http://localhost:8080/api/mutantes'),
                    axios.get('http://localhost:8080/api/viloes'),
                    axios.get('http://localhost:8080/api/locais')
                ]);

                if (!isMounted) return;

                const mutantes = resMutantes.status === 'fulfilled' ? resMutantes.value.data : [];
                const vils = resViloes.status === 'fulfilled' ? resViloes.value.data : [];
                const locs = resLocais.status === 'fulfilled' ? resLocais.value.data : [];

                if (mutantes.length > 0 && vils.length > 0 && locs.length > 0) {
                    setHerois(mutantes.filter(m => m.tipo === 'heroi'));
                    setViloes(vils);
                    setLocais(locs);
                    setLoading(false);
                    clearInterval(intervalId);
                }
            } catch (err) {
                console.log("Backend ainda não respondeu, tentando novamente...");
            }
        };

        fetchData();
        intervalId = setInterval(fetchData, 2000);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, []);

    const handleHeroiChange = (index, value) => {
        const newHerois = [...selectedHerois];
        newHerois[index] = value;
        setSelectedHerois(newHerois);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!selectedVilao || !selectedLocal || !selectedHerois[0]) {
            alert('Selecione vilão, local e pelo menos 1 herói.');
            return;
        }

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
                setNumHerois(1);
            })
            .catch(err => {
                console.error(err);
                alert('Erro ao cadastrar missão.');
            })
            .finally(() => setIsSubmitting(false));
    };

    if (loading) {
        return <p className="loader-banco">Carregando banco de dados...</p>;
    }

    return (
        <section id="cadastro-missao" className="container secao-cadastro-missao">
            <div className="cartao cartao-cadastro-missao">
                <div className="cartao-cadastro-missao__banner">
                    <img src={ImagemFormulario} alt="Imagem do formulário" />
                </div>
                <div className="cartao-cadastro-missao__conteudo">
                    <div className="cartao-cadastro-missao__texto">
                        <div className="cartao-descricao">
                            <h3>Cadastre uma nova Missão:</h3>
                            <div className="cartao-texto">
                                O alerta foi acionado! Prepare a operação e mobilize sua equipe.
                                Selecione o local sob ataque, identifique o vilão responsável e convoque até cinco heróis.
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
                                            setSelectedHerois(["", "", "", "", ""]);
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
                                            required
                                        >
                                            <option value="">Selecione um herói</option>
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
