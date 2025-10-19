import React, { useState } from 'react';
import Logo from '../assets/images/logo2.png';

function Header() {
  const [menuAtivo, setMenuAtivo] = useState(false);

  const toggleMenu = () => {
    setMenuAtivo(prev => !prev);
  };

  const scrollToSection = (id) => (event) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuAtivo(false);
  };

  const handleLinkClick = () => {
    if (menuAtivo) setMenuAtivo(false);
  };

  return (
    <header className="cabecalho-fixo">
      <div className="cabecalho-fixo__container">
        <a href="#">
          <img
            className="cabecalho-fixo__logo"
            src={Logo}
            alt="Logo dos X-Men"
          />
        </a>
        <nav className={`cabecalho-fixo__nav ${menuAtivo ? 'ativo' : ''}`}>
          <div className="menu-container">
            <button
              className="cabecalho-fixo__menu-hamburguer"
              aria-label="Abrir menu"
              aria-expanded={menuAtivo}
              aria-controls="menu-lista"
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <ul className="cabecalho-fixo__nav-lista" id="menu-lista">
            <li><a href="#cabecalho" onClick={scrollToSection('cabecalho')}>Início</a></li>
            <li><a href="/catalogo" onClick={() => setMenuAtivo(false)}>Cérebro</a></li>
            <li><a href="#locais" onClick={scrollToSection('locais')}>Locais</a></li>
            <li><a href="#missoes" onClick={scrollToSection('missoes')}>Missões</a></li>
            <li><a href="#artigo" onClick={scrollToSection('artigo')}>Artigo</a></li>
            <li><a href="#ranking" onClick={scrollToSection('ranking')}>Ranking</a></li>
            <li><a href="#cadastro-missao" onClick={scrollToSection('cadastro-missao')}>Cadastro</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
