import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/FilmCard.css';

const FilmCard = ({ film }) => {
    const [isHovered, setIsHovered] = useState(false);

    const { Title, Year, Genre, Poster, imdbID } = film;

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
                <h2>
                    {Title.length > 20 ? `${Title.substring(0, 20)}...` : Title}
                </h2>
                <img 
                    src={Poster || 'default-poster-url.jpg'} 
                    alt={`Постер фильма: ${Title}`} 
                    className="film-card-image"
                />
            </Link>
            <p>
                {Year || 'Неизвестно'}, {Genre || 'Неизвестно'}
            </p>
            <div className="film-card-footer">
                <Link to={`/film/${imdbID}`}>
                    <p>Перейти к просмотру</p>
                </Link>
                <span 
                    className="favorite-icon" 
                    role="button" 
                    tabIndex={0} 
                    aria-label="Добавить в избранное"
                >
                    ❤️
                </span>
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
        imdbID: PropTypes.string.isRequired // Обязательно для ссылки
    }).isRequired
};

export default FilmCard;

