import { useParams } from "react-router-dom";
import "./styles/Films.css";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";

const formatRating = (rating) => {
    if (typeof rating === 'number') {
        return rating.toFixed(1);
    }
    return 'Неизвестно';
};

export default function FilmDetail() {
    const { id } = useParams();
    const API_KEY = '48FEM83-Y74441K-JCTCM51-3VPG9BG';


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
            const response = await axios.get(`https://api.kinopoisk.dev/v1.4/image`, {
                headers: { 'X-API-KEY': API_KEY },
                params: {
                    movieId: id,
                    type: 'still',
                    limit: 1,
                },
            });
            return response.data.docs || [];
        },
    });


    const { data: backdrops, isLoading: backdropsLoading, isError: backdropsError } = useQuery({
        queryKey: ['backdrops', id], 
        queryFn: async () => {
            const response = await axios.get(`https://api.kinopoisk.dev/v1.4/image`, {
                headers: { 'X-API-KEY': API_KEY },
                params: {
                    movieId: id,
                    type: 'backdrops',
                    limit: 5,
                },
            });
            return response.data.docs || [];
        },
    });


    const isLoading = filmLoading || wallpapersLoading || backdropsLoading;
    const isError = filmError || wallpapersError || backdropsError;

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

    return (
        <div className="movies-container">
            <div className="filmMainInfo">
                <div className="film_Info">
                    <p className="film-rating">⭐ {formattedRating}</p>
                    <p className="film-year">{film.year || 'Неизвестно'}</p>
                </div>

                <img
                    src={film.poster?.url || 'default-poster-url.jpg'}
                    alt={`Постер фильма: ${film.name}`}
                    className="film-card-image"
                />
            </div>

            <div className="film-card-footer">
                <h2>{film.name}</h2>
            </div>

            <div className="backdrops">
                <h3>Кадры из фильма:</h3>
                <div className="backdrops-grid">
                    {Array.isArray(backdrops) && backdrops.map((backdrop, index) => (
                        <img
                            key={index}
                            src={backdrop.url}
                            alt={`Фоновое изображение ${index + 1}`}
                            className="backdrop-image"
                        />
                    ))}
                </div>
            </div>

            <div className="wallpapers">
                <h3>Обои:</h3>
                {wallpapers.length > 0 ? (
                    <img
                        src={wallpapers[0].url}
                        alt="Обои фильма"
                        className="wallpaper-image"
                    />
                ) : (
                    <p>Обои отсутствуют.</p>
                )}
            </div>
        </div>
    );
}


