import React from 'react';

const FilmDetail = ({ film }) => {
  // Проверяем, что объект film существует и имеет нужные поля
  if (!film) {
    return <p>Загрузка...</p>; // Показываем индикатор, пока данные не загружены
  }

  return (
    <div className="film-detail">
      <h1>{film.Title || 'Неизвестно'}</h1>
      <img 
        src={film.Poster || 'default-poster-url.jpg'} 
        alt={film.Title || 'Неизвестно'} 
        className="film-detail-image"
      />
      <p><strong>Год:</strong> {film.Year || 'Неизвестно'}</p>
      <p><strong>Жанр:</strong> {film.Genre || 'Неизвестно'}</p>
      <p><strong>Режиссер:</strong> {film.Director || 'Неизвестно'}</p>
      <p><strong>Описание:</strong> {film.Plot || 'Описание не доступно'}</p>
      <p><strong>Рейтинг IMDb:</strong> {film.imdbRating || 'Неизвестно'}</p>
      <p><strong>Кассовые сборы:</strong> {film.BoxOffice || 'Неизвестно'}</p>
    </div>
  );
};

export default FilmDetail;




