import { useState, useEffect } from "react";
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Login.module.scss';
import { Link} from "react-router-dom";
function Login() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsModalOpen(false);
    navigate(-1);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    isModalOpen && (
      <div className={styles.overlay} onClick={closeModal}>
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeButton} onClick={closeModal}>
            &times;
          </button>

          <div className={styles.videoContainer}>
            <ReactPlayer
              url='https://www.youtube.com/watch?v=gYbFUM6gB7Q'
              controls={true}
              width="100%"
              height="100%"
            />
          </div>

          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>Авторизация</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              closeModal();
            }}>
              <div className={styles.formGroup}>
                <input 
                  type="email" 
                  placeholder="Email" 
                  required 
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <input 
                  type="password" 
                  placeholder="Пароль" 
                  required 
                  className={styles.formInput}
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                Войти
              </button>
              <div className={styles.formFooter}>
                <span>Нет аккаунта?</span>
                <Link to="/register" className={styles.registerLink}>
                  Зарегистрироваться
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    )
  );
}

export default Login;