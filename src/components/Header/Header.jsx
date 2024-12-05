import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { cart } = useCart();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  // Calculate total items and price
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-left">
          <NavLink to="/" className={({ isActive }) => isActive ? "logo-link active" : "logo-link"}>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            {t('nav.posts')}
          </NavLink>
        </div>
        <div className="nav-right">
          <div 
            className="cart-info" 
            onMouseEnter={() => setDropdownVisible(true)}
            onMouseLeave={() => setDropdownVisible(false)}
          >
            <span className="cart-count">Items: {totalItems}</span>
            <span className="cart-price">Total: ${totalPrice.toFixed(2)}</span>
            {isDropdownVisible && (
              <div className="cart-dropdown">
                {cart.length > 0 ? (
                  cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <span>{item.title}</span>
                      <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                    </div>
                  ))
                ) : (
                  <div className="cart-empty">Cart is empty</div>
                )}
              </div>
            )}
          </div>
          <div className="language-switcher">
            <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'active' : ''}>
              English
            </button>
            <button onClick={() => changeLanguage('ar')} className={i18n.language === 'ar' ? 'active' : ''}>
              العربية
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
