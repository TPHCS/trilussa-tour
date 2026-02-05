import { useTour } from '../../hooks/useTour';
import { useLanguage } from '../../i18n/LanguageContext';
import { locations, getLocationForScene } from '../../data/locations';
import styles from './SceneNav.module.css';

export default function SceneNav() {
  const { currentSceneId, isNavOpen, setScene, setNavOpen } = useTour();
  const { t } = useLanguage();
  const currentLocation = currentSceneId ? getLocationForScene(currentSceneId) : null;
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  function handleLocationClick(location) {
    setScene(location.defaultScene);
    setNavOpen(false);
  }

  return (
    <>
      <div className={`${styles.sidebar} ${isNavOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <span className={styles.headerTitle}>{t('nav.title')}</span>
        </div>
        <nav className={styles.list}>
          {locations.map(loc => (
            <button
              key={loc.id}
              className={`${styles.item} ${currentLocation?.id === loc.id ? styles.active : ''}`}
              onClick={() => handleLocationClick(loc)}
            >
              <span className={styles.label}>{loc.label}</span>
              {loc.hasCTA && <span className={styles.spaBadge}>SPA</span>}
            </button>
          ))}
        </nav>
      </div>
      {isNavOpen && isMobile && (
        <div className={styles.backdrop} onClick={() => setNavOpen(false)} />
      )}
    </>
  );
}
