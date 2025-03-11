import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/FilmCard.css';


const FilmCard = ({ film }) => {
    const [isHovered, setIsHovered] = useState(false);

    const { Title, Year, Genre, Poster, imdbID, imdbRating } = film;

    return (
        <div 
            className="film-card" 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
            role="button"
            tabIndex={0}
            aria-label={`Фильм: ${Title}`}
        >
            <Link to={`/film/${imdbID}`} className="film-card-link">
                <div className="film-info">
                    <p className="film-rating">⭐ {imdbRating || 'Неизвестно'}</p>
                    <p className="film-year">{Year || 'Неизвестно'}</p>
                </div>
        
                <img 
                    src={Poster || 'default-poster-url.jpg'} 
                    alt={`Постер фильма: ${Title}`} 
                    className="film-card-image"
                />
            </Link>
        
            <p className={`film-genre ${isHovered ? 'visible' : ''}`}>
                {Genre || 'Неизвестно'}
            </p>
        
            <div className="film-card-footer">
                <h2>{Title.length > 30 ? `${Title.substring(0, 20)}...` : Title}</h2>
                <Link to={`/film/${imdbID}`} className="film-watch">
                    <p>Перейти к просмотру</p>
                </Link>
            </div>
        </div>
    );
};

FilmCard.propTypes = {
    film: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Year: PropTypes.string,
        Genre: PropTypes.string,
        Poster: PropTypes.string,
        imdbID: PropTypes.string.isRequired, // Обязательно для ссылки
        imdbRating: PropTypes.string // Можно сделать необязательным, если не всегда передается
    }).isRequired
};

export default FilmCard;


