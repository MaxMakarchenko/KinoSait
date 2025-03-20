import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import FilmCard from './FilmCard';

const ApiKino = () => {
    const API_KEY = '48FEM83-Y74441K-JCTCM51-3VPG9BG';

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery({
        queryKey: ['films'], 
        queryFn: async ({ pageParam = 1 }) => {
            const response = await axios.get('https://api.kinopoisk.dev/v1.3/movie', {
                params: { page: pageParam, limit: 20 },
                headers: { 'X-API-KEY': API_KEY },
            });
            return response.data;
        },
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return lastPage.docs.length === 20 ? nextPage : undefined;
        },
    });

    const films = data?.pages.flatMap(page => page.docs) || [];

    if (isLoading) {
        return <p>Загрузка...</p>;
    }

    if (isError) {
        return <p>Ошибка при загрузке данных.</p>;
    }

    return (
        <div>
            <div className="movies-container">
                {films.map((film, index) => (
                    <FilmCard key={`${film.id}-${index}`} film={film} />
                ))}
            </div>

            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                >
                    {isFetchingNextPage ? 'Загрузка...' : 'Загрузить еще фильмы'}
                </button>
            )}
        </div>
    );
};

export default ApiKino;

