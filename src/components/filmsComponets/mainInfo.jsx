import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import styles from "../styles/MainInfo.module.scss";
import { Link } from 'react-router-dom';
const formatRating = (rating) => {
    if (typeof rating === 'number') {
        return rating.toFixed(1);
    }
    return 'Неизвестно';
};



export default function MainInfo(){
    const { id } = useParams();
    // const API_KEY = '48FEM83-Y74441K-JCTCM51-3VPG9BG';
    const API_KEY ='2P1AZXX-TMHM4ZD-K73D1S4-KPST1MK';
    const { data: film, isLoading: filmLoading, isError: filmError } = useQuery({
        queryKey: ['film', id],
        queryFn: async () => {
            const response = await axios.get(`https://api.kinopoisk.dev/v1.3/movie/${id}`, {
                headers: { 'X-API-KEY': API_KEY },
            });
            return response.data;
        },
    });
    const { data: wallpapers, isLoading: wallpapersLoading, isError: wallpapersError } = useQuery({
        queryKey: ['wallpapers', id],
        queryFn: async () => {
            try {
                const response = await axios.get(`https://api.kinopoisk.dev/v1.4/image`, {
                    headers: { 'X-API-KEY': API_KEY },
                    params: {
                        movieId: id, 
                        type: 'wallpaper',
                        limit: 1,
                    },
                });
                console.log('Wallpapers response:', response.data);
                return response.data.docs?.filter(w => w.url) || [];
            } catch (error) {
                console.error("Ошибка при запросе обоев:", error);
                return [];
            }
        },
    });
    const isLoading = filmLoading || wallpapersLoading;
    const isError = filmError || wallpapersError;

    if (isLoading) {
        return <p>Загрузка...</p>;
    }

    if (isError) {
        return <p>Ошибка при загрузке данных.</p>;
    }

    if (!film) {
        return <p>Фильмы не найдены...</p>;
    }
    const formattedRating = formatRating(film.rating?.kp);
    return(
        <div
      className={styles.moviesContainer}
      style={{
        backgroundImage: wallpapers?.[0]?.url 
          ? `url('${wallpapers[0].url}')` 
          : 'url("https://via.placeholder.com/1920x1080?text=No+Wallpaper")',
      }}
    >
      <div className={styles.filmDetails}>
        <div className={styles.mainInformation}>
          <h2>{film.name}</h2>
          <p className={styles.filmRating}>⭐ {formattedRating}</p>
          <Link><p className={styles.filmYear}>{film.year || 'Неизвестно'}</p></Link>
          <h3>Жанры:</h3>
        <div className={styles.genresList}>
        {film.genres?.length > 0 ? (
        film.genres.map((genre) => (
        <Link 
            key={genre.id} 
            to={`/movies?genre=${genre.id}`} 
            className={styles.genreTag}
        >
       {` ${genre.name}`}
      </Link>
    ))
  ) : (
    <span>Жанры не указаны.</span>
  )}
</div>
        
          <h3>Страны:</h3>
          <Link to="/"><p>{film.countries?.map((country) => country.name).join(', ') || 'Страны не указаны.'}</p></Link>

          <h3>Продолжительность:</h3>
          <p>{film.movieLength ? `${film.movieLength} минут` : 'Продолжительность не указана.'}</p>

          <h3>Язык:</h3>
          <p>{film.language || 'Язык не указан.'}</p>

          <h3>В топе фильмов на:</h3>
          <p>{film.top250} месте</p>

          <h3>Возрастное ограничение:</h3>
          <p>{film.ageRating}+</p>
          <h3>Голоса и рейтинги:</h3>
        <div className="votes-info">
        {film.votes ? (
        <ul>
          <li>Кинопоиск: {film.votes.kp || '—'}</li>
          <li>IMDb: {film.votes.imdb || '—'}</li>
          <li>TMDb: {film.votes.tmdb || '—'}</li>
          <li>Критики: {film.votes.filmCritics || '—'}</li>
        </ul>
      ) : (
        <p>Рейтинги не доступны.</p>
      )}
    </div>
        </div>
      </div>
    </div>
    )
}