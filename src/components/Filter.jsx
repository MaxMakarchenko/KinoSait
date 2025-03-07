import React, { useState } from "react";
import { Link } from "react-router-dom";
import './styles/Filter.css'
import Button from '../components/button/button';

function Filter({ onCategoryChange }) {
    const [status, changeStatus] = useState(''); // Состояние для активной категории
    const filter_categories = ["", "Anime", "Horror", "Fantasy", "Comedy", "Marvel"]; // Доступные категории, добавлено пустое значение для "Все"

    return (

        <div className="filter">
            <div id="categories" className="filter__categories anchor">
                <div className="filter__categories-flex">
                    {filter_categories.map((category, index) => (
                        <div
                            key={index}
                            onClick={() => { 
                                changeStatus(category); // Обновляем состояние активной категории
                                onCategoryChange(category); // Вызываем функцию для обновления категории в MainMenu
                            }}
                            className={`filter__categories-item ${category === status ? 'active-category' : ''}`} // Добавляем класс для активной категории
                        >
                            <span>
                                <Link className="link_Janrs" to="#">{category || "Все"}</Link> {/* Ссылка на категорию */}
                            </span>

                        </div>
                    ))}
                    
                    <Button />
                </div>
            </div>
        </div>
    );
}

export default Filter;


