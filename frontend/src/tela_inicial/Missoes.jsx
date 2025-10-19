import React, { useEffect, useState } from 'react';
import Carousel from '../funcionalidades/Carousel';
import axios from 'axios';

export default function Missoes() {
    const [missoes, setMissoes] = useState([]);
    const fetchMissoes = () => {
        axios.get('http://localhost:8080/api/missoes')
            .then(res => {
                const missoes = res.data.map(m => ({
                    icones: [
                        `http://localhost:8080/images/personagens/${m.vilaoImg}`,
                        `http://localhost:8080/images/locais/${m.localImg}`
                    ],
                    titulo: m.vilaoAlter,
                    descricao: `Objetivo: Derrotar ${m.vilaoNome} ${m.vilaoSobrenome}\nLocal: ${m.localNome}\nEquipe Mobilizada: ${m.herois.join(', ')}`
                }));
                setMissoes(missoes.reverse());
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchMissoes();
        const interval = setInterval(fetchMissoes, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="missoes" className="container secao-missoes">
            <h2 className="titulo-secao">Missões Cadastradas:</h2>
            <Carousel
                items={missoes}
                renderItem={(b) => (
                    <article className="cartao cartao-missao">
                        <div className="cartao-missao__icones">
                            {b.icones.map((icone, i) => (
                                <img key={i} className="cartao-missao__icone" src={icone} alt="" />
                            ))}
                        </div>
                        <div className="cartao-missao__texto-wrapper">
                            <h3 className="cartao-missao__titulo">{b.titulo}</h3>
                            <p className="cartao-missao__descricao" style={{ whiteSpace: 'pre-line' }}>
                                {b.descricao}
                            </p>
                        </div>
                    </article>
                )}
            />
        </section>
    );
}
