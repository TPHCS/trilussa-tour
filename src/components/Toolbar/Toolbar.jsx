import { useState } from 'react';
import { useTour } from '../../hooks/useTour';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocationForScene } from '../../data/locations';
import ShareModal from '../Share/ShareModal';
import styles from './Toolbar.module.css';

export default function Toolbar() {
  const { currentSceneId, currentScene, isNavOpen, toggleNav, autorotate, toggleAutorotate } = useTour();
  const { lang, toggleLang, t } = useLanguage();
  const [showShare, setShowShare] = useState(false);
  const location = currentSceneId ? getLocationForScene(currentSceneId) : null;
  const sceneName = location?.label || currentScene?.name || '';

  function handleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  return (
    <>
      <header className={styles.toolbar}>
        <div className={styles.left}>
          <button
            className={styles.menuBtn}
            onClick={toggleNav}
            aria-label={isNavOpen ? t('toolbar.closeNav') : t('toolbar.openNav')}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {isNavOpen ? (
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
          </button>
          <a href={import.meta.env.BASE_URL} className={styles.logo}>
            <img src={`${import.meta.env.BASE_URL}img/logo.png`} alt="Trilussa Palace" className={styles.logoImg} />
          </a>
        </div>

        <h1 className={styles.title}>{sceneName}</h1>

        <div className={styles.right}>
          <button
            className={styles.langBtn}
            onClick={toggleLang}
            aria-label="Change language"
          >
            {lang.toUpperCase()}
          </button>
          <button
            className={styles.iconBtn}
            onClick={() => setShowShare(true)}
            aria-label={t('toolbar.share')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            className={`${styles.iconBtn} ${autorotate ? styles.active : ''}`}
            onClick={toggleAutorotate}
            aria-label={autorotate ? t('toolbar.pauseRotation') : t('toolbar.startRotation')}
            aria-pressed={autorotate}
          >
            {autorotate ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" />
                <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5,3 19,12 5,21" fill="currentColor" stroke="none" />
              </svg>
            )}
          </button>
          <button
            className={styles.iconBtn}
            onClick={handleFullscreen}
            aria-label={t('toolbar.fullscreen')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </header>

      {showShare && <ShareModal onClose={() => setShowShare(false)} />}
    </>
  );
}
