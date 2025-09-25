import React from 'react';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.content}>
          <h1 style={styles.title}>Medical Report System</h1>
          <p style={styles.subtitle}>
            Access and manage your medical reports with AI-powered explanations
          </p>
          <div style={styles.features}>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>📊</div>
              <h3>Detailed Reports</h3>
              <p>Comprehensive medical analysis and findings</p>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>🤖</div>
              <h3>AI Explanations</h3>
              <p>Get patient-friendly explanations in Arabic</p>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>📱</div>
              <h3>Easy Access</h3>
              <p>View reports anytime, anywhere</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px',
  },
  hero: {
    maxWidth: '1000px',
    width: '100%',
    textAlign: 'center',
  },
  content: {
    background: 'white',
    borderRadius: '20px',
    padding: '60px 48px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '24px',
    letterSpacing: '-0.025em',
    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: '1.25rem',
    color: '#64748b',
    marginBottom: '48px',
    lineHeight: '1.6',
    maxWidth: '600px',
    margin: '0 auto 48px',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
    marginTop: '48px',
  },
  feature: {
    padding: '32px',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
};

export default HomePage;
