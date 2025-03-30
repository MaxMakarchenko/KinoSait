import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useEffect, useRef } from 'react';
import styles from './styles/Janrs.module.scss';

import fantasy from '../img/fantasy.jpg';
import comedy from '../img/comedy.jpg';
import boevic from '../img/boevic.jpg';
import triller from '../img/triller.jpg';
import adventure from '../img/adventure.jpeg';
import drama from '../img/drama.jpg';
import bioGraphFiltr from '../img/bioGraphFiltr.jpg';
import criminalFiltr from '../img/criminalFiltr.jpg';
import detectiveFiltr from '../img/detectiveFiltr.jpg';
import familyFiltr from '../img/familyFiltr.jpg';
import fantasyFiltr from '../img/fantasyFiltr.jpg';
import melodramaFiltr from '../img/melodramaFiltr.jpg';
import multfilm from '../img/multfilm.jpg';
import warFiltr from '../img/warFiltr.jpg';
import WatchMores from '../img_icons/right-arrow.png';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const images = [
  { src: fantasy, link: '/Login' },
  { src: comedy, link: '/' }, 
  { src: boevic, link: '/' },
  { src: triller, link: '/' },
  { src: adventure, link: '/' },
  { src: drama, link: '/' },
  { src: bioGraphFiltr, link: '/Login' },
  { src: criminalFiltr, link: '/' },
  { src: detectiveFiltr, link: '/' },
  { src: familyFiltr, link: '/' },
  { src: fantasyFiltr, link: '/' },
  { src: melodramaFiltr, link: '/' },
  { src: multfilm, link: '/' },
  { src: warFiltr, link: '/' },
  { src: detectiveFiltr, link: '/' },
];

export default function Janrs() {
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (swiperInstance) {
      updateNavVisibility(swiperInstance);
    }
  }, []);

  const updateNavVisibility = (swiper) => {
    const prevButton = swiper.el.querySelector('.swiper-button-prev');
    const nextButton = swiper.el.querySelector('.swiper-button-next');

    if (prevButton && nextButton) {
      prevButton.style.display = swiper.isBeginning ? 'none' : 'block';
      nextButton.style.display = swiper.isEnd ? 'none' : 'block';
    }
  };

  return (
    <div className={styles.movies} id="movies">
      <div className={styles.wraperHeader}>
        <Link className={styles.janrs} to='/'>
          <h2>Жанры:</h2>
          <img className={styles.watchMoreImg} src={WatchMores} alt="Подробнее" />
        </Link>
        <Link className={styles.topKinoTitle} to='/'>
          <h3>Смотреть все</h3>
          <img className={styles.watchMoreImg} src={WatchMores} alt="Подробнее" />
        </Link>
      </div>
      <Swiper
        ref={swiperRef}
        className={styles.firstSwiper}
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={20}
        slidesPerView={6}
        onSlideChange={(swiper) => updateNavVisibility(swiper)}
        onInit={(swiper) => updateNavVisibility(swiper)}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <Link to={image.link}>
              <img 
                src={image.src} 
                alt={`Slide ${index + 1}`} 
                className={styles.swiperImage}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
