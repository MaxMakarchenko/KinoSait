import React, { useEffect, useState } from 'react';
import FilmCard from './FilmCard';

const ApiKino = ({ setFilms }) => {
    const [error, setError] = useState(null);
    const [films, setLocalFilms] = useState([]); // Локальное состояние для фильмов
    const [visibleFilms, setVisibleFilms] = useState(20); // Показываем по 20 фильмов сначала

    // Массив с уникальными ID фильмов
    const filmIds = [
        "tt0111161", "tt0068646", "tt0071562", "tt0468569", "tt0050083", "tt0133093",
        "tt0108052", "tt0167260", "tt0137523", "tt0372784", "tt0110912", "tt0109830",
        "tt0080684", "tt0317248", "tt0102926", "tt0499549", "tt0120737", "tt0073486",
        "tt0086190", "tt0076759", "tt0468569", "tt0072684", "tt0105695", "tt0107290",
        "tt0034583", "tt0111495", "tt0106112", "tt0266543", "tt0088763", "tt0212720",
        "tt0180093", "tt0268692", "tt0078748", "tt0033467", "tt0042876", "tt0108767",
        "tt0209144", "tt0106697", "tt0118799", "tt0082971", "tt0076657", "tt0098895",
        "tt0023983", "tt0133113", "tt0084614", "tt0117899", "tt0287479", "tt0172495",
        "tt0078788", "tt0082971", "tt0098972", "tt0113243", "tt0212428", "tt0278192",
        "tt0113243", "tt0087603", "tt0078792", "tt0113071", "tt0137472", "tt0144241",
        "tt0046014", "tt0278192", "tt0081487", "tt0142123", "tt0151804", "tt0102971",
        "tt0042123", "tt0104732", "tt0199873", "tt0146654", "tt0227939", "tt0153804",
        "tt0128744", "tt0093967", "tt0082167", "tt0039233", "tt0106182", "tt0150402",
        "tt0046222", "tt0092956", "tt0137255", "tt0064942", "tt0136715", "tt0150961",
        "tt0040516", "tt0067040", "tt0028086", "tt0027221", "tt0086210", "tt0043847",
        "tt0074015", "tt0013325", "tt0023832", "tt0025039", "tt0030231", "tt0030927",
        "tt0069647", "tt0065217", "tt0109822", "tt0075079", "tt0101076", "tt0029085",
        "tt0091184", "tt0021221", "tt0068557", "tt0057781", "tt0012534", "tt0048941",
        "tt0047395", "tt0035194", "tt0030194"
    ];

    const uniqueFilmIds = [...new Set(filmIds)]; // Убираем дубликаты

    const fetchFilms = async (startIndex, endIndex) => {
        const fetchedFilms = []; // Массив для хранения полученных фильмов
        const apiKey = "5a5b7997"; // Ваш API-ключ
    
        // Проходим по каждому фильму в указанном диапазоне
        for (let i = startIndex; i < Math.min(endIndex, uniqueFilmIds.length); i++) {
            try {
                const response = await fetch(`https://www.omdbapi.com/?i=${uniqueFilmIds[i]}&apikey=${apiKey}`);
                
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
                }
    
                const filmData = await response.json();
    
                if (filmData.Response === "False") {
                    throw new Error(filmData.Error);
                }
    
                // Проверяем, что фильм не был получен ранее
                if (!films.find(film => film.imdbID === filmData.imdbID)) {
                    fetchedFilms.push(filmData);
                }
            } catch (err) {
                console.error(`Ошибка при получении фильма с ID ${uniqueFilmIds[i]}:`, err);
                setError(`Ошибка при получении фильма с ID ${uniqueFilmIds[i]}: ${err.message}`);
            }
        }
    
        // Добавляем новые фильмы к локальному состоянию
        setLocalFilms(prevFilms => [...prevFilms, ...fetchedFilms]);
        setFilms(prevFilms => [...prevFilms, ...fetchedFilms]); // Обновляем состояние в родительском компоненте
    };

    const loadMoreFilms = () => {
        const nextVisibleFilms = visibleFilms + 20; // Увеличиваем количество видимых фильмов на 20
        setVisibleFilms(nextVisibleFilms);
        fetchFilms(visibleFilms, nextVisibleFilms); // Загружаем новые фильмы
    };

    useEffect(() => {
        fetchFilms(0, visibleFilms); // Загружаем начальные фильмы
    }, [visibleFilms]);

    return (
        <div>
            <div className="movies-container">
                {films.map((film, index) => (
                    <FilmCard key={`${film.imdbID}-${index}`} film={film} />
                ))}
            </div>

            {/* Кнопка для загрузки еще фильмов */}
            {films.length < uniqueFilmIds.length && (
                <button onClick={loadMoreFilms}>Загрузить еще фильмы</button>
            )}
        </div>
    );
};

export default ApiKino;


