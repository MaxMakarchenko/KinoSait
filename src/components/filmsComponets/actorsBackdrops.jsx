import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import VideoPlayer from "./VideoPlayer";
import axios from "axios";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import styles from '../styles/ActorsBacdrops.module.scss';

export default function ActorsBackdrops() {
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

    const { data: images, isLoading: imagesLoading, isError: imagesError } = useQuery({
        queryKey: ['images', id],
        queryFn: async () => {
            try {
                const response = await axios.get(`https://api.kinopoisk.dev/v1.4/image`, {
                    headers: { 'X-API-KEY': API_KEY },
                    params: {
                        movieId: id,
                        type: 'still', 
                        limit: 12,
                    },
                });
                return response.data.docs || [];
            } catch (error) {
                console.error("Ошибка при запросе изображений:", error);
                throw error;
            }
        },
    });

    const isLoading = filmLoading || imagesLoading;
    const isError = filmError || imagesError;
     
    if (isLoading) {
        return <p>Загрузка...</p>;
    }
    
    if (isError) {
        return <p>Ошибка при загрузке данных.</p>;
    }
    
    return (
        <>
       
        <div className={styles.fourthSwiperContainer}>
        <h3>Актеры и создатели:</h3>
            {film.persons?.length ? (
                <Swiper
                    modules={[Navigation, Pagination]}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                        dynamicMainBullets: 3
                    }}
                    slidesPerView={"8"}
                    spaceBetween={20}
                    freeMode={true}
                    className={styles.personsSwiper}
                >
                    {film.persons.slice(0, 10).map((person) => (
                        <SwiperSlide 
                            key={person.id} 
                            className={styles.personSlide}
                        >
                            <div className={styles.personItem}>
                                <img 
                                    src={person.photo || 'https://via.placeholder.com/150'} 
                                    alt={person.name || person.enName} 
                                />
                                <p>
                                    {person.name} 
                                    {person.enName && ` (${person.enName})`}
                                </p>
                                <p>
                                    {person.description || person.profession}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p>Информация об актерах отсутствует.</p>
            )}
        </div>

            <div className={styles.backdrops}>
                {images?.length > 0 ? (
                    <div className={styles.thirdSwiper}>
                        <h3>Изображения:</h3>
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={20}
                            slidesPerView="auto"
                            centeredSlides={false}
                            navigation
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                                dynamicMainBullets: 3
                            }}
                            breakpoints={{
                                320: { 
                                    slidesPerView: 1,
                                    pagination: { dynamicMainBullets: 1 }
                                },
                                640: { 
                                    slidesPerView: 2,
                                    pagination: { dynamicMainBullets: 2 }
                                },
                                1024: { 
                                    slidesPerView: 3,
                                    pagination: { dynamicMainBullets: 3 }
                                }
                            }}
                        >
                            {images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={image.url}
                                        alt={`Изображение ${index + 1}`}
                                        className={styles.backdropImage}
                                        loading="lazy"
                                        onError={(e) => { 
                                            e.currentTarget.src = '/placeholder-image.jpg';
                                            e.currentTarget.onerror = null;
                                        }}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ) : (
                    <p>Изображения отсутствуют.</p>
                )}
                 <div className={styles.anotherInformation}>
                <h3>Описание:</h3>
                <p>{film.description || 'Описание отсутствует.'}</p>
                </div>
                <VideoPlayer filmId={film.id} />
            </div>
            
        </>
    );
}