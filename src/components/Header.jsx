import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import './styles/Header.css';

function Header() {
    const [headerClass, setHeaderClass] = useState('visible');
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isHidden, setIsHidden] = useState(false);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < 100) {
            setHeaderClass('visible');
        } else {
            if (currentScrollY > lastScrollY) {
                setHeaderClass('hidden');
            } else {
                setHeaderClass('scrolled');
            }
        }
        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        if (headerClass === 'hidden') {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
    }, [headerClass]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <header className={headerClass}>
            <Link to="/" className="logo">
                <i className='bx bxs-movie'></i>Zoom cinema
            </Link>
            <div className='bx bx-menu' id="menu-icon"></div>
            <ul className={`navbar ${isHidden ? 'hidden' : ''}`}>
                <li><NavLink to="/" className={({ isActive }) => isActive ? 'nav-link home-active' : 'nav-link'}>Главная</NavLink></li>
                <li><NavLink to="/Main" className={({ isActive }) => isActive ? 'nav-link home-active' : 'nav-link'}>Каталог</NavLink></li>
                <li><NavLink to="/Anime" className={({ isActive }) => isActive ? 'nav-link home-active' : 'nav-link'}>Аниме</NavLink></li>
                <li><NavLink to="/Films" className={({ isActive }) => isActive ? 'nav-link home-active' : 'nav-link'}>Сериалы</NavLink></li>
            </ul>
            <Link to="/Login"><button className="btn">Войти в аккаунт</button></Link>
        </header>
    );
}

export default Header;
