import React, { useState} from 'react'
import games from '../../../fotos.json';
import styled from "styled-components";
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation'
import {EffectCoverflow, Navigation, Autoplay} from 'swiper/modules'
import './gameSwiper.css';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const ImagensContainer = styled.div`
  
`

const Imagen = styled.img`
 
`



function BannerSwiper({ games }) {
    const duplicatedGames = [...games, ...games, ...games];
    const [active, setActive] = useState(false);

    const handleToggleVideo = () => {
        setActive(!active);
    }
    return (
        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            spaceBetween={-120}
            navigation={true}
            loop={false}
            centeredSlides={false} 
            slidesPerView={'auto'} // Change this to the number of slides you want visible at a time
            coverflowEffect={{
                rotate: 35,
                stretch: 0, // Adjust this to 0 to avoid stretching slides
                depth: 250,
                modifier: 1,
                slideShadows: true,
            }}
          //  autoplay={{
       //         delay: 2500,
       //         disableOnInteraction: false,
       //     }}
            modules={[EffectCoverflow, Navigation, Autoplay]}
            className='gameSwiper'
        >
            {games.map(game => (
                <SwiperSlide key={game.id}>
                    <div className='gameSlider'>
                        <img src={game.img} alt="Game Image"/>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default BannerSwiper;