import React, { useState, useEffect } from 'react';
import FilmDetail from './FilmDetail';

const FilmPage = ({ match }) => {
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true); // Добавляем флаг загрузки

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        // Добавьте логирование, чтобы увидеть, когда запрос происходит
        console.log('Загружаем данные о фильме...');
        setLoading(true); // Устанавливаем загрузку в true перед запросом
        const response = await fetch(`https://www.omdbapi.com/?i=${match.params.id}&apikey=YOUR_API_KEY`);
        const data = await response.json();
        if (data.Response === 'True') {
          setFilm(data); // Устанавливаем данные фильма в состояние
        } else {
          console.error('Ошибка при получении данных:', data.Error);
        }
      } catch (error) {
        console.error('Ошибка запроса:', error);
      } finally {
        setLoading(false); // Завершаем загрузку
      }
    };

    // Убедитесь, что запрос выполняется только один раз
    if (match.params.id) {
      fetchFilmDetails();
    }
  }, [match.params.id]); // Массив зависимостей: только изменение id запускает запрос

  // Если данные загружаются, показываем индикатор
  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      <FilmDetail film={film} />
    </div>
  );
};

export default FilmPage;

