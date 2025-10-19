import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Loader() {
  const [isHidden, setIsHidden] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  let message = null;
  let minimumLoadTime = 1000;
  let loaderClass = 'loader-home';

  if (path === '/catalogo') {
    message = 'Procurando Mutantes...';
    minimumLoadTime = 2500;
    loaderClass = 'loader-catalogo';
  }

  useEffect(() => {
    setIsHidden(false);

    const timer = setTimeout(() => {
      setIsHidden(true);
    }, minimumLoadTime);

    return () => clearTimeout(timer);
  }, [location, minimumLoadTime]);

  return (
    <div
      id="loader"
      className={`${isHidden ? 'hidden' : ''} ${loaderClass}`}
      onTransitionEnd={(e) => {
        if (isHidden) e.currentTarget.style.display = 'none';
      }}
    >
      <div className="spinner"></div>
      {message && <h2 className="titulo-secao">{message}</h2>}
    </div>
  );
}

export default Loader;
