import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({ filmId }) => {
  const [playerHtml, setPlayerHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const VIDEO_SOURCES = [
    `https://pandahd.lat/film/${filmId}/` 
  ];

  useEffect(() => {
    const loadPlayer = async () => {
      try {
        setLoading(true);
        setError(null);

        const iframeCode = `
          <iframe
            src="${VIDEO_SOURCES[0]}"
            width="100%"
            height="100%"
            frameborder="0"
            allowfullscreen
            style="position: absolute; top: 0; left: 0;"
            sandbox="allow-same-origin allow-scripts allow-popups"
          ></iframe>
        `;

        setPlayerHtml(iframeCode);
        setLoading(false);
      } catch (err) {
        console.error('Ошибка загрузки плеера:', err);
        setError('Не удалось загрузить видео. Попробуйте обновить страницу.');
        setLoading(false);
      }
    };

    loadPlayer();
  }, [filmId, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <div style={styles.loader}>Загрузка видео...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorText}>{error}</div>
        <button style={styles.retryButton} onClick={handleRetry}>
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div style={styles.videoContainer}>
      <div 
        style={styles.videoWrapper}
        dangerouslySetInnerHTML={{ __html: playerHtml }}
      />
    </div>
  );
};

const styles = {
  videoContainer: {
    position: 'relative',
    width: '70rem',       
    height: '1200px',      
    margin: '0',
    padding: '0',
    overflow: 'hidden',
    backgroundColor: '#000'
  },
  videoWrapper: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  loaderContainer: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '24px'
  },
  errorContainer: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#fff',
    padding: '20px',
    textAlign: 'center'
  },
  errorText: {
    fontSize: '20px',
    marginBottom: '20px',
    color: '#ff3333'
  },
  retryButton: {
    padding: '12px 30px',
    backgroundColor: '#ff3333',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#ff5555'
    }
  }
};

VideoPlayer.propTypes = {
  filmId: PropTypes.number.isRequired
};

export default VideoPlayer;