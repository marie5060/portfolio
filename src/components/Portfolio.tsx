import React, { useRef, useState } from 'react';

import game from '../../assets/game.svg';
import music from '../../assets/music.svg';
import surf from '../../assets/surf.svg';
import tools from '../../assets/tools.svg';
import wine from '../../assets/Wine_bottle.svg';
import UseElementOnScreen from '../hooks/UseElementOnScreen';
import IProject from '../interfaces/IProject';

const Portfolio = () => {
  const [selectProject, setSelectProject] = useState(0);
  const projects: IProject[] = [
    {
      idProject: 1,
      title: 'Crash Blind Test',
      image: game,
      text: "Projet de Blind test musical avec la possibilité de jouer avec ses propres playlists grace à l'API Deezer.",
      link: 'https://marie5060.github.io/Blind-Crash-Test/',
    },
    {
      idProject: 2,
      title: 'Les Femmes Prennent Le Large',
      image: surf,
      text: 'Premier projet avec un client, avec pour but de promouvoir les rencontres de surfeuses dans la pratique de leurs sport.',
    },
    {
      idProject: 3,
      title: 'LiveUp',
      image: music,
      text: "Hackathon (32h) sur le thème de la musique. Nous avons effectué un site d'évènements musicaux.",
      link: 'https://aurelienbrethes.github.io/Liveup/',
    },
    {
      idProject: 4,
      title: 'ManoMano X Wild',
      image: tools,
      text: " Hackathon (48h) en partenariat avec ManoMano visant à améliorer l'expérience utilisateur sur leur site.",
    },
    {
      idProject: 5,
      title: 'SecretCellar',
      image: wine,
      text: 'Projet de formation effectué en premier lieu en php/twig, puis grâce au framework symfony dans un second temps. Une solution permettant de gérer une cave à vin personnelle (gestion de stock, CRUD)',
    },
  ];
  const titleRef = useRef<HTMLDivElement>(null);

  const isVisible: boolean = UseElementOnScreen(
    {
      rootElement: undefined,
      rootMargin: '0px',
      threshold: 0.8,
    },
    titleRef,
  );
  const titleName: string = 'PORTFOLIO';
  const movingLetters: string[] = ['P', 'R', 'F', 'O'];

  return (
    <>
      <div className="portfolio__name" ref={titleRef}>
        {titleName.split(' ').map((word, index) => (
          <div className="portfolio__name__word" key={index}>
            {word.split('').map((letter, index) => (
              <span
                className="portfolio__name__word--letter"
                key={index}
                style={{
                  transform:
                    !isVisible && movingLetters.includes(letter)
                      ? `translateY(-20px)`
                      : `translateY(0)`,
                  transitionDelay: isVisible ? `${index / 10}s` : '',
                  opacity: !isVisible ? '0' : '1',
                }}>
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="portfolio__projects">
        <div className="portfolio__projects__project">
          <ul className="portfolio__projects__project--titleProject">
            {projects.map((project, index) => (
              <li
                style={{
                  borderRight:
                    selectProject === index && window.innerWidth > 800
                      ? `3px solid #fdeded`
                      : ``,
                  borderBottom:
                    selectProject === index && window.innerWidth < 800
                      ? `3px solid #fdeded`
                      : ``,
                }}
                key={index}
                role="presentation">
                <button
                  style={{
                    color: selectProject === index ? '#fdeded' : '',
                    transform: selectProject === index ? 'scale(1.05)' : 'scale(1)',
                  }}
                  onClick={() => setSelectProject(index)}>
                  <div>
                    <img
                      style={{ opacity: selectProject === index ? 1 : 0.3 }}
                      src={project.image}
                      alt="logo_project"
                    />
                  </div>
                  <p>{project.title}</p>
                </button>
              </li>
            ))}
          </ul>
          <div className="portfolio__projects__project--details">
            {projects.map((project, index) => (
              <div
                className="portfolio__projects__project--details__map"
                style={{
                  opacity: selectProject === index ? 1 : 0,
                  transform:
                    selectProject === index ? `translateY(0)` : `translateY(-25vw)`,
                }}
                key={index}>
                <div>
                  <img src={project.image} alt="logo_project" />
                </div>
                <h2>{project.title}</h2>
                <p>{project.text}</p>    
                  {projects.map((project, index) => selectProject === index && project.link && (
                    <a
                      className="portfolio__name--link"
                      key={index}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer">
                      Voir le site
                    </a>
                    ),
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default Portfolio;
