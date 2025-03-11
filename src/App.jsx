import marvelImage from './img/marvel.jpg';
import batMAn2 from './img/batman2.jpg';
import crow from './img/crow.jpg';
import fast from './img/fastFurious.jpg';
import inception from './img/inception.jpg';
import interstellar from './img/interstellar.jpeg';
import scream from './img/scream.jpg';
import spiritedAway from './img/spiritedAway.jpg';
import sawWal from './img/sawWal.jpg';
import transformerWall1 from './img/transformerWall1.jpeg';
import ConstantineWall from './img/ConstantineWall.jpeg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay} from 'swiper/modules';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import React, { useState } from 'react';
import './App.css';

import FilmDetail from './components/Films';
import Janrs from './components/Janrs';
import TopKino from './components/TopKino';
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import Login from './components/Login';
import ApiKino from './components/ApiKinopoisk';
import Footer from './components/Foot';
import Anime from './components/Anime';

const slidesData = [
  { id: 1, img: marvelImage, category: "Marvel Universe", title: "Мстители Финал", link: "/film/1" },
  { id: 2, img: batMAn2, category: "DC Comics", title: "Бэтмен(2022)", link: "/film/2" },
  { id: 3, img: crow, category: "Боевик/Триллер", title: "Ворон", link: "/film/3" },
  { id: 4, img: fast, category: "Боевик/Криминал", title: "Форсаж", link: "/film/4" },
  { id: 5, img: inception, category: "Научная фантастика/Боевик", title: "Начало", link: "/film/5" },
  { id: 6, img: interstellar, category: "Научная фантастика/Приключения", title: "Интерстеллар", link: "/film/6" },
  { id: 7, img: scream, category: "Ужасы/Детективный фильм", title: "Крик(2022)", link: "/film/7" },
  { id: 8, img: spiritedAway, category: "Аниме", title: "Унесённые призраками", link: "/film/8" },
  { id: 9, img: sawWal, category: "Ужасы/Криминал", title: "Пила. Игра на выживание", link: "/film/9" },
  { id: 10, img: transformerWall1, category: "Боевик/Научная фантастика", title: "Трансформеры", link: "/film/10" },
  { id: 11, img: ConstantineWall, category: "Ужасы/Фэнтези", title: "Константин", link: "/film/11" },
];

function Home() {
  const [films, setFilms] = useState([]);

  return (
    <>
      <Header />
      <section className="home swiper" id="home">
        <Swiper
          spaceBetween={40}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          navigation
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{
            delay: 3000, // Время в миллисекундах между переключениями
            disableOnInteraction: false, // Не отключать автопроигрывание при взаимодействии
        }}
        >
          {slidesData.map((slide, index) => (
            <SwiperSlide key={index} className="container">
              
              <img src={slide.img} alt={slide.title} onClick={() => window.location.href = slide.link}  />

              <div className="home-text">
                
                <Link to={slide.link}><span>{slide.category}</span></Link>
                <Link to={slide.link}><h1>{slide.title}</h1></Link>
                <Link to={slide.link} className="btn">Смотреть сейчас</Link>
                <Link to={slide.link} className="play">
                  <i className='bx bx-play'></i>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <Janrs />
      <MainMenu />
      <TopKino />
      <ApiKino setFilms={setFilms} /> 
      <Footer/>

    </>
  );
}


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Main' element={<MainMenu />} />
        <Route path='/Login' element={<Login />} />
        <Route path="/film/:id" element={<FilmDetail/>} />
 

      </Routes>
    </Router>
  );
}

export default App;
