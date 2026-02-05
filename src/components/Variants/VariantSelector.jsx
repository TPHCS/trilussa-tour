import { useTour } from '../../hooks/useTour';
import { useVariants } from '../../hooks/useVariants';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './VariantSelector.module.css';

const labelKeys = {
  'Luci on': 'variants.lightsOn',
  'Luci off': 'variants.lightsOff',
  'ROSA': 'variants.rosa',
  'AMBRA': 'variants.ambra',
  'VERDE': 'variants.verde',
  'BLU': 'variants.blu',
};

export default function VariantSelector() {
  const { currentSceneId, setScene } = useTour();
  const { variants, parentScene, hasVariants, activeVariantId } = useVariants(currentSceneId);
  const { trackVariantSelect } = useAnalytics();
  const { t } = useLanguage();

  const translateLabel = (label) => {
    const key = labelKeys[label] || labelKeys[label.toUpperCase()];
    return key ? t(key) : label;
  };

  if (!hasVariants || variants.length === 0) return null;

  function handleVariantClick(variant) {
    trackVariantSelect(variant.id, variant.label);
    setScene(variant.id);
  }

  function handleBack() {
    if (parentScene) setScene(parentScene.id);
  }

  const isOnVariant = currentSceneId !== parentScene?.id;

  return (
    <div className={styles.container}>
      {isOnVariant && parentScene && (
        <button className={styles.backBtn} onClick={handleBack}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t('variants.back')}
        </button>
      )}
      <div className={styles.buttons}>
        {variants.map(v => (
          <button
            key={v.id}
            className={`${styles.btn} ${v.id === activeVariantId ? styles.active : ''}`}
            onClick={() => handleVariantClick(v)}
          >
            {translateLabel(v.label)}
          </button>
        ))}
      </div>
    </div>
  );
}
