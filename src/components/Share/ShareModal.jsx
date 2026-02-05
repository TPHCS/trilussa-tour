import { useState, useEffect } from 'react';
import { useTour } from '../../hooks/useTour';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './ShareModal.module.css';

export default function ShareModal({ onClose }) {
  const { currentSceneId } = useTour();
  const { trackShare } = useAnalytics();
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        trackShare(currentSceneId);
      });
    }
  }, [currentSceneId, trackShare]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied, onClose]);

  return (
    <div className={styles.toast}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{copied ? t('share.copied') : t('share.copy')}</span>
    </div>
  );
}
