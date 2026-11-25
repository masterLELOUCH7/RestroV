import React, { useEffect, useState } from 'react';
import {
  Briefcase,
  Menu,
  ShoppingBag,
  User,
  UtensilsCrossed,
  X,
} from 'lucide-react';

interface NavbarProps {
  activeView: 'guest' | 'ba';
  setActiveView: (v: 'guest' | 'ba') => void;
  cartCount: number;
  spiceCoins: number;
  userName: string | null;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  cartCount,
  spiceCoins,
  userName,
  onOpenCart,
  onOpenAuth,
  onScrollTo,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    setMobileOpen(false);
    if (activeView !== 'guest') {
      setActiveView('guest');
      setTimeout(() => onScrollTo(id), 80);
    } else {
      onScrollTo(id);
    }
  };

  return (
    <>
      <div className="ann-bar">
        <span>Grand Diwali Offer: 30% OFF Direct Orders ₹999+</span>
        <span className="ann-pill">CODE: DIWALI30</span>
        <span>Zero Aggregator Markup · Dwarka Sector 10</span>
        <span className="ann-pill">Free Delivery: VIKFREE</span>
      </div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div
          className="nav-logo"
          onClick={() => {
            setActiveView('guest');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="logo-ring">
            <UtensilsCrossed size={20} color="#fbbf24" />
          </div>
          <div className="logo-text">
            <span className="brand">CHEF VIK RESTRO</span>
            <span className="sub">Delhi&apos;s No. 1 · Sector 10 · Est. 2020</span>
          </div>
        </div>

        <ul className="nav-links">
          <li>
            <button className="nav-link-btn" onClick={() => handleNav('offers')}>
              Offers
            </button>
          </li>
          <li>
            <button className="nav-link-btn" onClick={() => handleNav('menu')}>
              Menu
            </button>
          </li>
          <li>
            <button className="nav-link-btn" onClick={() => handleNav('thali-builder')}>
              Thali Studio
            </button>
          </li>
          <li>
            <button className="nav-link-btn" onClick={() => handleNav('subscriptions')}>
              Tiffin Plans
            </button>
          </li>
          <li>
            <button className="nav-link-btn" onClick={() => handleNav('catering')}>
              Catering
            </button>
          </li>
          <li>
            <button className="nav-link-btn" onClick={() => handleNav('reservation')}>
              Floorplan
            </button>
          </li>
        </ul>

        <div className="nav-actions">
          <button
            className={`ba-toggle-btn ${activeView === 'ba' ? 'active' : ''}`}
            onClick={() => {
              setActiveView(activeView === 'ba' ? 'guest' : 'ba');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            title="Switch to Executive Business Model Blueprint & Revenue Simulator"
          >
            <Briefcase size={14} />
            <span>{activeView === 'ba' ? 'Guest Site' : 'Business Models'}</span>
          </button>

          <button
            className="nav-icon"
            onClick={onOpenAuth}
            title={userName ? `${userName} · ${spiceCoins} Spice Coins` : 'Sign In / Loyalty Club'}
          >
            <User size={17} />
          </button>

          <button className="nav-icon" onClick={onOpenCart} title="Open Order Cart">
            <ShoppingBag size={17} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>

          <button className="btn-reserve" onClick={() => handleNav('reservation')}>
            Book Table
          </button>

          <button
            className="hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu">
          <button onClick={() => handleNav('offers')}>Special Offers</button>
          <button onClick={() => handleNav('menu')}>Explore Menu</button>
          <button onClick={() => handleNav('thali-builder')}>Build Royal Thali</button>
          <button onClick={() => handleNav('subscriptions')}>Tiffin Subscriptions</button>
          <button onClick={() => handleNav('reservation')}>Live Table Floorplan</button>
          <button onClick={() => handleNav('catering')}>Banquet &amp; Catering</button>
          <button
            onClick={() => {
              setMobileOpen(false);
              setActiveView(activeView === 'ba' ? 'guest' : 'ba');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ color: '#fbbf24', fontWeight: 700 }}
          >
            {activeView === 'ba' ? '← Back to Restaurant' : '★ View Business Model Blueprint'}
          </button>
        </div>
      )}
    </>
  );
};
