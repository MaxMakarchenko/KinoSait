import React from 'react';
import FilmCard from './FilmCard';

const FilmList = ({ films }) => {
    return (
        <div className="film-card-container"> {/* Общий контейнер для всех карточек */}
            {films.map(film => (
                <FilmCard key={film.id} film={film} />
            ))}
        </div>
    );
};

export default FilmList;
