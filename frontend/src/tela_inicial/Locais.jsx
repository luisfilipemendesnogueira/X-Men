import React, { useEffect, useState } from 'react';
import Carousel from '../funcionalidades/Carousel';

export default function Locais() {
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let intervalId;

    const fetchLocais = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/locais');
        if (!res.ok) throw new Error('Backend não está pronto');
        const data = await res.json();
        if (isMounted) {
          if (data.length > 0) {
            setLocais(data);
            setLoading(false);
            clearInterval(intervalId);
          }
        }
      } catch (err) {
        console.log('Backend ainda não respondeu, tentando novamente...');
      }
    };

    fetchLocais();
    intervalId = setInterval(fetchLocais, 2000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section id="locais" className="container secao-locais">
      <h2 className="titulo-secao">Locais Importantes para os Mutantes:</h2>
      {loading ? (
        <p className="loader-banco">Carregando banco de dados...</p>
      ) : (
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
      )}
    </section>
  );
}
