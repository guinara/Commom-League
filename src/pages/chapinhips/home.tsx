import React from 'react';
import './home.css';
import GameSwiper from '../../componentes/Banner/newBannerCarrosel';
import { Game } from '../../data/types'; // Ajuste o caminho conforme necessário

interface HomeProps {
  games: Game[];
}

const Home: React.FC<HomeProps> = ({ games }) => {
  return (
    <section id="home" className="home active"> {/* Certifique-se de que está usando <section> corretamente */}
      <div className="container-fluid">
        <div className="row">
          <GameSwiper games={games} />
        </div>
      </div>
    </section>
  );
};

export default Home;
