import { useState } from "react";
import styles from './styles/Filter.module.scss';

const Filter = ({ onCategoryChange }) => {
    const [activeCategory, setActiveCategory] = useState('');

    // Список жанров, соответствующих API Кинопоиска
    const filterCategories = [
        { id: '', name: "Все" },
        { id: 'аниме', name: "Аниме" },
        { id: 'ужасы', name: "Ужасы" },
        { id: 'фэнтези', name: "Фэнтези" },
        { id: 'комедия', name: "Комедия" },
        { id: 'боевик', name: "Боевик" },
        { id: 'драма', name: "Драма" },
        { id: 'фантастика', name: "Фантастика" }
    ];

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        onCategoryChange(categoryId); 
    };

    return (
        <div className={styles.filterContainer}>
            <div className={styles.filterWrapper}>
                <div className={styles.filterList}>
                    {filterCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className={`${styles.filterButton} ${
                                category.id === activeCategory ? styles.active : ''
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Filter;