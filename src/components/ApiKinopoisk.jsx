import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import FilmCard from './FilmCard';
import Filter from './Filter'; 
import styles from "./styles/ApiKino.module.scss"; 

const ApiKino = () => {
    // const API_KEY = '48FEM83-Y74441K-JCTCM51-3VPG9BG';
    const API_KEY = '2P1AZXX-TMHM4ZD-K73D1S4-KPST1MK';
    const [selectedGenre, setSelectedGenre] = useState('');

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery({
        queryKey: ['films', selectedGenre], 
        queryFn: async ({ pageParam = 1 }) => {
            const params = { 
                page: pageParam, 
                limit: 20,
                ...(selectedGenre && { 'genres.name': selectedGenre })
            };
            
            const response = await axios.get('https://api.kinopoisk.dev/v1.3/movie', {
                params,
                headers: { 'X-API-KEY': API_KEY },
            });
            return response.data;
        },
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return lastPage.docs.length === 20 ? nextPage : undefined;
        },
        staleTime: 5 * 60 * 1000, 
    });

    const films = data?.pages.flatMap(page => page.docs) || [];

    const handleGenreChange = (genre) => {
        setSelectedGenre(genre);
    };

    if (isLoading) {
        return <div className={styles.loading}>Загрузка...</div>;
    }

    if (isError) {
        return <div className={styles.error}>Ошибка при загрузке данных.</div>;
    }

    return (
        <div className={styles.container}>
            <Filter onCategoryChange={handleGenreChange} />
            
            <div className={styles.moviesContainer}>
                {films.length > 0 ? (
                    films.map((film) => (
                        <FilmCard key={film.id} film={film} />
                    ))
                ) : (
                    <div className={styles.noResults}>Фильмы не найдены</div>
                )}
            </div>

            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className={styles.loadMoreButton}
                >
                    {isFetchingNextPage ? 'Загрузка...' : 'Загрузить еще фильмы'}
                </button>
            )}
        </div>
    );
};

export default ApiKino;
