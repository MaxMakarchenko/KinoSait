import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useRef, useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import './styles/TopKino.css';

import Bunker from "../uploads/67156.jpg";
import Calmar from "../uploads/Calmar.jpg";
import Invicible from "../uploads/Invicible.png";
import Shelter from "../uploads/Shelter.jpg";
import sololeveling from "../uploads/sololeveling.jpg";
import SpiderMan from "../uploads/SpiderMan.jpg";
import TheRookie from "../uploads/TheRookie.jpg";
import WhatIf from '../uploads/Je81p5my.jpg';
import Severance from '../uploads/125972.jpg';
import ScaryMovie from '../uploads/ScaryMovie.jpg'

const Box = [
  { id: 301, img: Severance, title: "Разделение", grade: "8.5", new: "Новинка", pay: "Бесплатно" },
  { id: 2, img: Bunker, title: "Бункер", grade: "7.9", new: "Новинка", pay: "Платно" },
  { id: 3, img: Calmar, title: "Игра в кальмара", grade: "8.0", new: "", pay: "Бесплатно" },
  { id: 4, img: Invicible, title: "Неуязвимый", grade: "7.5", new: "", pay: "Платно" },
  { id: 5, img: Shelter, title: "Укрытие", grade: "8.8", new: "", pay: "Бесплатно" },
  { id: 6, img: sololeveling, title: "Поднятие уровня в одиночку", grade: "8.6", new: "", pay: "Бесплатно" },
  { id: 7, img: SpiderMan, title: "Новый человек паук: высокое напряжение", grade: "6.5", new: "Новинка", pay: "Бесплатно" },
  { id: 8, img: TheRookie, title: "Новичок", grade: "8.6", new: "", pay: "Бесплатно" },
  { id: 9, img: WhatIf, title: "ЧТО, ЕСЛИ...?", grade: "7.6", new: "", pay: "Платно" },
  { id: 10, img: ScaryMovie, title: "Очень страшное кино", grade: "7.0",pay: "Платно", new: "" }
];

export default function TopKino() {
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
        <div className="top-kino-container">
            <div className="wraper_header">
                <Link className="Janrs" to='/'>
                    <h2>Популярно:</h2>
                </Link>
                <Link className="top-kino-title" to='/'>
                    <h3>Смотреть все</h3>
                </Link>
            </div>
            <Swiper
                ref={swiperRef}
                className="second-swiper"
                modules={[Navigation, Scrollbar]}
                navigation
                onSlideChange={(swiper) => updateNavVisibility(swiper)}
                onInit={(swiper) => updateNavVisibility(swiper)}
                spaceBetween={20}
                slidesPerView={5}
                scrollbar={{ draggable: true }}>
    {Box.map((item) => (
        <SwiperSlide key={item.id}>
            <Link to={`/film/${item.id}`} className="kino-box">
                <img src={item.img} alt={item.title} />
                <div className="overlay">
                    <p className="grade">Рейтинг: {item.grade}</p>
                    {item.new && <p className="new">{item.new}</p>}
                </div>
                <div className="info">
                    <h3>{item.title}</h3>
                    <div className={`pay ${item.pay === "Бесплатно" ? "free" : "paid"}`}>
                            {item.pay}
                    </div>
                </div>
            </Link>
        </SwiperSlide>
    ))}
</Swiper>

        </div>
    );
}




