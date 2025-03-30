import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles/FilmCard.module.scss';

const formatRating = (rating) => {
  if (typeof rating === 'number') {
    return rating.toFixed(1);
  }
};

const FilmCard = ({ film }) => {
  const { name, year, poster, id, rating } = film;
  const formattedRating = formatRating(rating?.kp);
  
  return (
    <div 
      className={styles.filmCard} 
      role="button"
      tabIndex={0}
      aria-label={`Фильм: ${name}`}
    >
      <Link to={`/film/${id}`} className={styles.filmCardLink}>
        <div className={styles.filmInfo}>
          <p className={styles.filmRating}>⭐ {formattedRating || 'Неизвестно'}</p>
          <p className={styles.filmYear}>{year || 'Неизвестно'}</p>
        </div>
    
        <img 
          src={poster?.url || 'default-poster-url.jpg'} 
          alt={`Постер фильма: ${name}`} 
          className={styles.filmCardImage}
        />
      </Link>
    
      <div className={styles.filmCardFooter}>
        <h2>{name.length > 20 ? `${name.substring(0, 15)}...` : name}</h2>
        <Link to={`/film/${id}`} className={styles.filmWatch}>
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
