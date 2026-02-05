import { useState, useEffect } from 'react';
import { useTour } from '../../hooks/useTour';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './LoadingOverlay.module.css';

export default function LoadingOverlay() {
  const { isLoading } = useTour();
  const { t } = useLanguage();
  const [visible, setVisible] = useState(isLoading);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setFadeOut(false);
      setVisible(true);
    } else if (visible) {
      setFadeOut(true);
      const timer = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div className={`${styles.overlay} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <div className={styles.spinner}>
          <div className={styles.ring} />
        </div>
        <p className={styles.text}>{t('loading.title')}</p>
        <p className={styles.subtext}>{t('loading.subtitle')}</p>
      </div>
    </div>
  );
}
