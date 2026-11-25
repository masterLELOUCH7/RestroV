import React from 'react';
import { Clock, Mail, MapPin, Navigation, Phone, Train, UtensilsCrossed } from 'lucide-react';
import { GALLERY_IMAGES, TESTIMONIALS } from '../data/restaurantData';

interface FooterContactProps {
  onScrollTo: (id: string) => void;
  onOpenBA: () => void;
}

export const TestimonialsGalleryContact: React.FC<FooterContactProps> = ({
  onScrollTo,
  onOpenBA,
}) => {
  return (
    <>
      {/* TESTIMONIALS */}
      <section className="testi-section">
        <div className="container">
          <div className="eyebrow">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Guest Voices</span>
          </div>
          <h2 className="section-title">
            What Delhi <em>Says About Us</em>
          </h2>
          <div className="testi-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="testi-card">
                <div style={{ color: 'var(--gold)', fontSize: 13, letterSpacing: 3, marginBottom: 14 }}>
                  ★★★★★
                </div>
                <p className="t-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="t-person">
                  <div className="t-ava">
                    <img src={t.avatar} alt={t.name} loading="lazy" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="gallery-section">
        <div className="container">
          <div className="eyebrow">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Visual Feast</span>
          </div>
          <h2 className="section-title">
            Inside <em>Sector 10</em>
          </h2>
          <div className="g-grid">
            {GALLERY_IMAGES.map((img) => (
              <div key={img.title} className="g-item">
                <img src={img.src} alt={img.title} loading="lazy" />
                <div className="g-hover">
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{img.title}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--gold-light)' }}>{img.caption}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="eyebrow">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Find Us</span>
          </div>
          <h2 className="section-title">
            Visit <em>Chef Vik Restro</em>
          </h2>

          <div className="contact-grid">
            <div className="contact-map">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80"
                alt="Chef Vik Restro Dwarka"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.28,
                }}
              />
              <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: '50%',
                    background: 'rgba(249,115,22,0.18)',
                    border: '1px solid var(--saffron)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 14,
                  }}
                >
                  <MapPin size={26} color="#f97316" />
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 900 }}>
                  Dwarka Sector 10 Flagship
                </h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', margin: '6px 0 20px' }}>
                  Shop No. 42, Main Market · 5 min walk from Sector 10 Metro
                </p>
                <button
                  className="btn-primary"
                  onClick={() =>
                    window.open('https://maps.google.com/?q=Dwarka+Sector+10+New+Delhi', '_blank')
                  }
                >
                  <Navigation size={14} /> Open in Google Maps
                </button>
              </div>
            </div>

            <div>
              <div className="c-row">
                <div className="c-icon"><Phone size={18} /></div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Direct Concierge</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                    +91 98765 43210 · +91 91234 56789
                  </div>
                </div>
              </div>
              <div className="c-row">
                <div className="c-icon"><Mail size={18} /></div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Email &amp; Events</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                    hello@chefvikrestro.com · events@chefvikrestro.com
                  </div>
                </div>
              </div>
              <div className="c-row">
                <div className="c-icon"><MapPin size={18} /></div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Address</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                    Shop No. 42, Main Market, Sector 10, Dwarka, New Delhi – 110075
                  </div>
                </div>
              </div>
              <div className="c-row">
                <div className="c-icon"><Clock size={18} /></div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Hours</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                    Mon – Fri: 11:00 AM – 11:30 PM · Weekends: 10:00 AM – 12:30 AM
                  </div>
                </div>
              </div>
              <div className="c-row" style={{ borderBottom: 'none' }}>
                <div className="c-icon"><Train size={18} /></div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Metro Access</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                    Dwarka Sector 10 Metro (Blue Line) · Exit Gate 2
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="logo-ring">
                  <UtensilsCrossed size={19} color="#fbbf24" />
                </div>
                <div className="logo-text">
                  <span className="brand">CHEF VIK RESTRO</span>
                  <span className="sub">Delhi&apos;s No. 1 · Sector 10 · Est. 2020</span>
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.85, marginTop: 16, maxWidth: 320 }}>
                Authentic Agra-meets-Delhi culinary artistry powered by direct digital ordering,
                tiffin subscriptions, live floorplan seating, and modular event catering.
              </p>
            </div>

            <div className="f-col">
              <div className="f-col-title">Guest Channels</div>
              <ul>
                <li><button onClick={() => onScrollTo('menu')}>Direct Menu (0% App Fee)</button></li>
                <li><button onClick={() => onScrollTo('thali-builder')}>Royal Thali Studio</button></li>
                <li><button onClick={() => onScrollTo('subscriptions')}>Tiffin Subscriptions</button></li>
                <li><button onClick={() => onScrollTo('reservation')}>Live Table Floorplan</button></li>
                <li><button onClick={() => onScrollTo('catering')}>Banquet Estimator</button></li>
              </ul>
            </div>

            <div className="f-col">
              <div className="f-col-title">Chef&apos;s Picks</div>
              <ul>
                <li><button onClick={() => onScrollTo('chef')}>48-Hr Dal Makhani</button></li>
                <li><button onClick={() => onScrollTo('chef')}>Old Delhi Butter Chicken</button></li>
                <li><button onClick={() => onScrollTo('chef')}>Awadhi Parda Biryani</button></li>
                <li><button onClick={() => onScrollTo('offers')}>Active Promo Codes</button></li>
              </ul>
            </div>

            <div className="f-col">
              <div className="f-col-title">Business &amp; Strategy</div>
              <ul>
                <li><button onClick={onOpenBA} style={{ color: '#fbbf24', fontWeight: 700 }}>5-Model Strategy Blueprint</button></li>
                <li><button onClick={onOpenBA}>Unit Economics Simulator</button></li>
                <li><button onClick={() => onScrollTo('contact')}>Sector 10 Directions</button></li>
              </ul>
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: 22,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 12,
              fontSize: 12,
              color: 'var(--muted)',
            }}
          >
            <span>© 2026 Chef Vik Restro, Dwarka Sector 10, New Delhi. All Rights Reserved.</span>
            <span>Direct D2C · Tiffin MRR · Experiential Dining · Banquet Catering</span>
          </div>
        </div>
      </footer>
    </>
  );
};
