import React from 'react';
import Carousel from '../funcionalidades/Carousel';
import ConselhoSilencioso from '../assets/images/ConselhoSilencioso.png';

export default function Artigo() {
    const artigo = [
        {
            titulo: "Krakoa, uma Nação Mutante!",
            conteudo: [
                "Krakoa é uma ilha viva e mutante que se tornou o lar seguro e soberano para todos os mutantes, funcionando como uma nação independente com governo próprio, leis, sistemas de defesa e infraestrutura.",
                "Ela simboliza a união da comunidade mutante, ao mesmo tempo em que mantém relações diplomáticas e comerciais com o mundo exterior, exportando tecnologias e produtos médicos derivados de mutantes.",
                "Protegida pelos X-Men e suas forças de defesa, Krakoa combina segurança, autonomia e inovação, promovendo sustentabilidade, educação e crescimento contínuo de seus cidadãos, consolidando-se como um lar de esperança, liberdade e prosperidade para a comunidade mutante.",
                "Sua política é organizada em torno do Conselho Silencioso, composto por doze membros que representam diferentes facções e interesses da comunidade mutante, tomando decisões por consenso e refletindo uma governança colaborativa, estratégica e focada no bem coletivo."
            ],
            imagem: ConselhoSilencioso,
            alt: "Imagem do Conselho Silencioso de Krakoa."
        }
    ];

    return (
        <section id="artigo" className="container secao-artigo">
            <h2 className="titulo-secao">{artigo[0].titulo}</h2>
            <Carousel
                items={artigo}
                itemsPerView={1}
                renderItem={(s) => (
                    <div className="secao-artigo-conteudo">
                        <ul className="secao-artigo-lista">
                            {s.conteudo.map((texto, i) => (
                                <li key={i}>{texto}</li>
                            ))}
                        </ul>
                        <div className="secao-artigo-imagem-container">
                            <div className="secao-artigo-imagem-wrapper">
                                <a
                                    href="https://marvel.fandom.com/wiki/Quiet_Council_of_Krakoa_(Earth-616)"
                                    target="_blank"
                                >
                                    <img
                                        src={s.imagem}
                                        alt={s.alt}
                                        className="imagem-conselho-silencioso"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            />
        </section>
    );
}
