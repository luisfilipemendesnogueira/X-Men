import React from 'react';
import Logo from '../assets/images/logo.png';

const scrollToSection = (id) => (event) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};

function Home() {
    return (
        <header id="cabecalho" className="container secao-home">
            <div className="secao-home__barra-topo">
                <a>
                    <img className="secao-home__logo" src={Logo} alt="Logo dos X-Men" />
                </a>
            </div>
            <div className="secao-home__conteudo-central">
                <h1 className="secao-home__titulo">
                    Bem-Vindo ao Cérebro
                </h1>
                <p className="secao-home__subtitulo">
                    Um sistema desenvolvido para localizar, monitorar e catalogar mutantes ao redor do mundo.
                    Aqui você pode acessar os registros oficiais do Instituto Xavier, ver os mutantes mais ativos
                    e descobrir quem está liderando nas missões pela paz entre humanos e mutantes.
                </p>
                <div className="secao-home__conteudo-central botoes">
                    <a href="/catalogo" className="botao botao-cta">Acessar o Banco de Dados do Cérebro</a>
                    <a href="#cadastro-missao" className="botao botao-cta" onClick={scrollToSection('cadastro-missao')}>Cadastrar heróis para realizar missões</a>
                </div>
            </div>
        </header>
    );
}

export default Home;
