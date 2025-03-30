import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import ApiKino from './ApiKinopoisk';
import FilmCard from './FilmCard'; 
import './styles/Swiper.css';

const MainMenu = () => {
    const [films, setFilms] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleFetchFilms = (fetchedFilms) => {
        setFilms(fetchedFilms); // Сохраняем фильмы, полученные из API
        setLoading(false); // Устанавливаем загрузку в false после получения данных
    };

    const handleFetchError = (errorMessage) => {
        setError(errorMessage); // Устанавливаем сообщение об ошибке
        setLoading(false); // Устанавливаем загрузку в false при ошибке
    };

    const filteredFilms = React.useMemo(() => {
        if (!selectedCategory) return films; // Если категория не выбрана, возвращаем все фильмы
    
        return films.filter(film => 
            film.genres && film.genres.some(genre => genre.name === selectedCategory)
        );
    }, [films, selectedCategory]); // Зависимости для useMemo

    return (
        <>
            <div className="movies" id="movies">
                <div className="movies-container">
                    {loading && <p></p>} {/* Индикатор загрузки */}
                    {error && <p>Ошибка: {error}</p>} {/* Сообщение об ошибке */}
                    {filteredFilms.length > 0 ? (
                        filteredFilms.map(film => (
                            <FilmCard 
                                key={film.kinopoiskId || film.imdbID} // Используйте уникальный ключ
                                film={film}
                            />
                        ))
                    ) : (
                        !loading && <p>Нет доступных фильмов.</p> // Сообщение, если фильмов нет
                    )}
                </div>
            </div>
            <ApiKino onFetchFilms={handleFetchFilms} onFetchError={handleFetchError} />
        </>
    );
};

export default MainMenu;

