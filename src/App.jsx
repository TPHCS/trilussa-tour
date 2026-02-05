import { TourProvider } from './hooks/useTour';
import { LanguageProvider } from './i18n/LanguageContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import PanoViewer from './components/Viewer/PanoViewer';
import SceneNav from './components/Navigation/SceneNav';
import Toolbar from './components/Toolbar/Toolbar';
import VariantSelector from './components/Variants/VariantSelector';
import LoadingOverlay from './components/Loading/LoadingOverlay';
import './styles/tokens.css';
import './styles/animations.css';

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <TourProvider>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <PanoViewer />
            <Toolbar />
            <SceneNav />
            <VariantSelector />
            <LoadingOverlay />
          </div>
        </TourProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
