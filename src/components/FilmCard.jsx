import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/FilmCard.css';



const formatRating = (rating) => {
    if(typeof rating ==='number'){
        return rating.toFixed(1);
    }
}
const FilmCard = ({ film }) => {
    const { name, year, poster, id, rating } = film;
    const formattedRating = formatRating(rating?.kp);
    return (
        <div 
            className="film-card" 
            role="button"
            tabIndex={0}
            aria-label={`Фильм: ${name}`}
        >
            <Link to={`/film/${id}`} className="film-card-link">
                <div className="film-info">
                    <p className="film-rating">⭐ {formattedRating || 'Неизвестно'}</p>
                    <p className="film-year">{year || 'Неизвестно'}</p>
                </div>
        
                <img 
                    src={poster?.url || 'default-poster-url.jpg'} 
                    alt={`Постер фильма: ${name}`} 
                    className="film-card-image"
                />
            </Link>
        
            <div className="film-card-footer">
                <h2>{name.length > 20 ? `${name.substring(0, 15)}...` : name}</h2>
                <Link to={`/film/${id}`} className="film-watch">
                    <p>Перейти к просмотру</p>
                </Link>
            </div>
        </div>
    );
};

FilmCard.propTypes = {
    film: PropTypes.shape({
        name: PropTypes.string.isRequired,
        year: PropTypes.number,
        poster: PropTypes.shape({
            url: PropTypes.string
        }),
        id: PropTypes.number.isRequired, 
        rating: PropTypes.shape({
            kp: PropTypes.number
        })
    }).isRequired
};

export default FilmCard;

