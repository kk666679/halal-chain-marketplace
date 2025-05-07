import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import DemoButton from '../components/DemoButton';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            {t('home.hero.title')}
          </h1>
          <p className="hero-subtitle">
            {t('home.hero.subtitle')}
          </p>
          <div className="hero-cta">
            <DemoButton />
            <Link to="/marketplace" className="explore-button">
              {t('home.hero.explore')}
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/halal-globe.png" alt="Global Halal Network" />
        </div>
      </section>

      {/* Marketplace Features */}
      <section className="features-section">
        <h2>{t('home.features.title')}</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🕌</div>
            <h3>{t('home.features.certified')}</h3>
            <p>{t('home.features.certified_desc')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚖️</div>
            <h3>{t('home.features.ethical')}</h3>
            <p>{t('home.features.ethical_desc')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>{t('home.features.global')}</h3>
            <p>{t('home.features.global_desc')}</p>
          </div>
        </div>
      </section>

      {/* Vendor Highlights */}
      <section className="vendor-showcase">
        <h2>{t('home.vendors.title')}</h2>
        <div className="vendor-grid">
          {/* Map through featured vendors */}
          <div className="vendor-card">
            <img src="/images/vendors/meat-supplier.jpg" alt="Halal Meat Supplier" />
            <h3>Premium Halal Meats</h3>
            <p>Certified by IFANCA</p>
            <span className="cert-badge">🕌 Certified</span>
          </div>
          {/* Add more vendor cards */}
        </div>
        <Link to="/vendors" className="see-all">
          {t('home.vendors.see_all')} →
        </Link>
      </section>

      {/* Certification Process */}
      <section className="certification-process">
        <h2>{t('home.certification.title')}</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>{t('home.certification.step1')}</h3>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>{t('home.certification.step2')}</h3>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>{t('home.certification.step3')}</h3>
          </div>
        </div>
        <Link to="/certification" className="verify-cta">
          {t('home.certification.cta')}
        </Link>
      </section>
    </div>
  );
};

export default Home;