import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error?.message || 'Unknown error',
        fatal: true,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          height: '100%', background: '#1E1B18', color: '#C8A88B',
          fontFamily: "'Cormorant Garamond', serif", textAlign: 'center', padding: 32,
        }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: 16 }}>Virtual Tour</h1>
          <p style={{ color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', marginBottom: 24 }}>
            Si è verificato un errore. Ricarica la pagina.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 24px', background: '#C8A88B', color: '#1E1B18',
              border: 'none', borderRadius: 8, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
            }}
          >
            Ricarica
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
