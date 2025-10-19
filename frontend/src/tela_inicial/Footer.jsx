import React from 'react';
import Logo from '../assets/images/logo.png';
import GitHubIcon from '../assets/icons/github-142-svgrepo-com.svg';
import LinkedInIcon from '../assets/icons/linkedin-svgrepo-com.svg';
import GitLabIcon from '../assets/icons/gitlab-svgrepo-com.svg';

function Footer() {
    return (
        <footer className="rodape">
            <div className="rodape__logo-redes">
                <div className="rodape__logo">
                    <a>
                        <img src={Logo} alt="Logo da Imobiliária Lar Doce Click" />
                    </a>
                </div>
                <ul className="rodape__redes-sociais">
                    <li><a href="https://github.com/luisfilipemendesnogueira" target='_blank'><img src={GitHubIcon} alt="GitHub" /></a></li>
                    <li><a href="https://www.linkedin.com/in/luis-filipe-mendes-nogueira-669a76264/" target='_blank'><img src={LinkedInIcon} alt="LinkedIn" /></a></li>
                    <li><a href="https://gitlab.com/luisfilipemendesnogueira" target='_blank'><img src={GitLabIcon} alt="GitLab" /></a></li>
                </ul>
            </div>
            <p className="rodape__copyright">© 2025 Instituto Xavier para Jovens Superdotados. Todos os direitos reservados.</p>
        </footer>
    );
}

export default Footer;
