import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  
  const menuItems = [
    'home', 'features', 'vendors', 
    'account', 'certification', 'about'
  ];

  return (
    <nav className="navbar">
      <div className="brand">
        <Link to="/">HalaIChain</Link>
      </div>
      
      <div className="nav-items">
        {menuItems.map((item) => (
          <Link key={item} to={`/${item}`} className="nav-link">
            {t(`nav.${item}`)}
          </Link>
        ))}
        
        <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;