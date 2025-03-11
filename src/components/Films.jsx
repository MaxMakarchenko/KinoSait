import React from "react";
import { Link } from "react-router-dom";
import './styles/Films.css';

const FilmDetail = ({ films = [] }) => { 
    if (!films.length) {
        return <p>Фильмы не найдены.</p>; 
    }

    return (
        <div className="movies-container">
            {films.map((film) => (
                <div key={film.imdbID} className="film-card">
                    <Link to={`/film/${film.imdbID}`} className="film-card-link">
                        <h2>{film.Title}</h2>
                        <img src={film.Poster} alt={film.Title} className="film-card-image" />
                        <p>Год: {film.Year}</p>
                        <p>Жанр: {film.Genre}</p>
                        <p>Рейтинг IMDb: {film.imdbRating}</p>
                        <p className="film-watch">Перейти к просмотру</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default FilmDetail;




