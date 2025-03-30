import { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import styles from './styles/Header.module.scss';
import { Icon } from '@iconify/react';
import bxMovie from '@iconify/icons-bx/bxs-movie';
import bxMenu from '@iconify/icons-bx/bx-menu';

function Header() {
    const [headerClass, setHeaderClass] = useState('visible');
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isHidden, setIsHidden] = useState(false);
    const [menuActive, setMenuActive] = useState(false);

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

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    return (
        <header className={`${styles.header} ${styles[headerClass]}`}>
            <Link to="/" className={styles.logo}>
                <Icon icon={bxMovie} className={styles.bx} />
                Zoom cinema
            </Link>
            <Icon 
                icon={bxMenu} 
                className={styles.menuIcon} 
                id="menu-icon"
                onClick={toggleMenu}
            />
            <ul className={`${styles.navbar} ${isHidden ? styles.hidden : ''} ${menuActive ? styles.active : ''}`}>
                <li>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            isActive ? `${styles.navLink} ${styles.homeActive}` : styles.navLink
                        }
                    >
                        Главная
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/Main" 
                        className={({ isActive }) => 
                            isActive ? `${styles.navLink} ${styles.homeActive}` : styles.navLink
                        }
                    >
                        Каталог
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/Anime" 
                        className={({ isActive }) => 
                            isActive ? `${styles.navLink} ${styles.homeActive}` : styles.navLink
                        }
                    >
                        Аниме
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/Films" 
                        className={({ isActive }) => 
                            isActive ? `${styles.navLink} ${styles.homeActive}` : styles.navLink
                        }
                    >
                        Сериалы
                    </NavLink>
                </li>
            </ul>
            <Link to="/Login" className={styles.btn}>Войти в аккаунт</Link>
        </header>
    );
}

export default Header;
