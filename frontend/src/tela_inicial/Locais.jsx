import React, { useEffect, useState } from 'react';
import Carousel from '../funcionalidades/Carousel';

export default function Locais() {
  const [locais, setLocais] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/api/locais')
      .then(res => res.json())
      .then(data => setLocais(data))
      .catch(err => console.error('Erro ao carregar locais:', err));
  }, []);

  return (
    <section id="locais" className="container secao-locais">
      <h2 className="titulo-secao">Locais Importantes para os Mutantes:</h2>
      <Carousel
        items={locais}
        renderItem={(local) => (
          <article
            className="cartao cartao-local"
            onClick={() => local.link && window.open(local.link, "_blank")}
          >
            <img
              className="cartao-local__imagem"
              src={`http://localhost:8080/images/locais/${local.imagem}`}
              alt={local.nomeLocal}
            />
            <div className="cartao-local__conteudo">
              <h3 className="cartao-local__titulo">{local.nomeLocal}</h3>
              <span className="cartao-local__localizacao">{local.localizacao}</span>
            </div>
          </article>
        )}
      />
    </section>
  );
}
