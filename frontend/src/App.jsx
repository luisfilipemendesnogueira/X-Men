import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './funcionalidades/Loader';
import Header from './tela_inicial/Header';
import Home from './tela_inicial/Home';
import Locais from './tela_inicial/Locais';
import Missoes from './tela_inicial/Missoes';
import Artigo from './tela_inicial/Artigo';
import Ranking from './tela_inicial/Ranking';
import CadastrarMissoes from './tela_inicial/CadastrarMissoes';
import Footer from './tela_inicial/Footer';
import Catalogo from './tela_catalogo/Catalogo';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Loader />
              <Header />
              <Home />
              <main>
                <Locais />
                <Missoes />
                <Artigo />
                <Ranking />
                <CadastrarMissoes />
              </main>
              <Footer />
            </>
          }
        />
        <Route path="/catalogo" element={<><Loader /><Catalogo /></>} />
      </Routes>
    </Router>
  );
}

export default App;
