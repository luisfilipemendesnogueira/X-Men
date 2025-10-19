import React, { useEffect, useState } from 'react';
import Carousel from '../funcionalidades/Carousel';
import StarRating from "../funcionalidades/StarRating";

export default function Ranking() {
    const [ranking, setRanking] = useState([]);
    const fetchTopHerois = () => {
        fetch('http://localhost:8080/api/herois/top')
            .then(res => res.json())
            .then(data => {
                const top = data.map((heroi, index) => ({
                    nome: heroi.alterEgo,
                    imagem: `http://localhost:8080/images/personagens/${heroi.imagem}`,
                    texto: `Top ${index + 1}\nQuantidade de Missões: ${heroi.contador_missoes}`,
                    contador_missoes: heroi.contador_missoes,
                    estrelas: heroi.dificuldadeMedia || 1,
                    pontuacaoTotal: heroi.pontuacaoTotal
                }));
                setRanking(top);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchTopHerois();
        const interval = setInterval(fetchTopHerois, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="ranking" className="container secao-ranking">
            <h2 className="titulo-secao">Os Heróis Mais Ativos:</h2>
            <div>
                <Carousel
                    items={ranking}
                    itemsPerView={1}
                    renderItem={(ranking) => (
                        <div className="cartao ranking">
                            <figure className="ranking-figura">
                                <img className="ranking-imagem" src={ranking.imagem} alt={`Imagem de ${ranking.nome}`} />
                                <figcaption className="ranking-heroi">{ranking.nome}</figcaption>
                            </figure>
                            <blockquote className="ranking-texto" style={{ whiteSpace: 'pre-line' }}>
                                {ranking.texto}
                            </blockquote>
                            <div className="ranking-avaliacao">
                                <span style={{ marginRight: '8px', fontWeight: 'bold' }}>Dificuldade média das missões:</span>
                                <div className="ranking-estrela-texto">
                                    <div className="ranking-estrelas">
                                        <StarRating value={ranking.estrelas} size={24} />
                                    </div>
                                    <div style={{ fontWeight: 'bold' }}>
                                        ({ranking.estrelas})
                                    </div>
                                </div>
                            </div>
                            <div className="ranking-pontuacao" style={{ marginTop: '15px', fontWeight: 'bold' }}>
                                Pontuação total: {ranking.pontuacaoTotal}
                            </div>
                        </div>
                    )}
                />
            </div>
        </section>
    );
}
