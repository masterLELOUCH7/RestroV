import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Calendar,
  ChefHat,
  Layers,
  Repeat,
  Sparkles,
  Users,
} from 'lucide-react';

interface HeroProps {
  onScrollTo: (id: string) => void;
  onOpenBA: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollTo, onOpenBA }) => {
  const [counts, setCounts] = useState({ guests: 0, dishes: 0, rating: 0, years: 0 });

  useEffect(() => {
    const start = performance.now();
    const duration = 1200;
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const ease = 1 - Math.pow(1 - p, 3);
      setCounts({
        guests: Math.round(12400 * ease),
        dishes: Math.round(92 * ease),
        rating: Number((4.9 * ease).toFixed(1)),
        years: Math.round(6 * ease),
      });
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-bg" />
      <div className="hero-grid-lines" />
      <div className="hero-content container">
        <div>
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            <span>Dwarka Sector 10 · Delhi&apos;s #1 Rated Fine Dining</span>
          </div>

          <h1 className="hero-title">
            Taste the Soul
            <span className="line2">of Royal India</span>
            in Every Bite
          </h1>

          <p className="hero-desc">
            Founded by Chef Vikram Das in 2020 — uniting 48-hour copper-deg classics, live charcoal
            tandoor craft, zero-commission direct delivery, and bespoke Dwarka hospitality under one
            flagship digital roof.
          </p>

          <div className="hero-cta">
            <button className="btn-primary" onClick={() => onScrollTo('menu')}>
              Order Direct · Save 25% <ArrowRight size={15} />
            </button>
            <button className="btn-outline" onClick={() => onScrollTo('reservation')}>
              <Calendar size={15} /> Live Floorplan Booking
            </button>
          </div>

          <div className="channel-pills">
            <button className="channel-pill" onClick={() => onScrollTo('thali-builder')}>
              <Layers size={14} color="#fbbf24" /> Build Royal Thali (₹399)
            </button>
            <button className="channel-pill" onClick={() => onScrollTo('subscriptions')}>
              <Repeat size={14} color="#f97316" /> Daily Tiffin Plans
            </button>
            <button className="channel-pill" onClick={() => onScrollTo('catering')}>
              <Users size={14} color="#fbbf24" /> Banquet Estimator
            </button>
            <button className="channel-pill" onClick={onOpenBA}>
              <Sparkles size={14} color="#fbbf24" /> 5-Model Strategy Hub
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <span className="stat-num">{counts.guests.toLocaleString()}+</span>
              <div className="stat-label">Happy Guests</div>
            </div>
            <div>
              <span className="stat-num">{counts.dishes}</span>
              <div className="stat-label">Signature Dishes</div>
            </div>
            <div>
              <span className="stat-num">{counts.rating} ★</span>
              <div className="stat-label">Critics Rating</div>
            </div>
            <div>
              <span className="stat-num">{counts.years}+ Yrs</span>
              <div className="stat-label">Culinary Craft</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-mosaic">
            <div className="mosaic-cell">
              <img
                src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900&q=85"
                alt="Royal Indian Curry Spread"
              />
              <span className="mosaic-caption">48-Hr Copper Deg Gravies</span>
            </div>
            <div className="mosaic-cell">
              <img
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=85"
                alt="Awadhi Dum Biryani"
              />
              <span className="mosaic-caption">Parda Dum Biryani</span>
            </div>
            <div className="mosaic-cell">
              <img
                src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=85"
                alt="Chargrilled Paneer Tikka"
              />
              <span className="mosaic-caption">Live Charcoal Tandoor</span>
            </div>
          </div>

          <div className="hero-float-badge">
            <ChefHat size={20} style={{ margin: '0 auto 4px', display: 'block' }} />
            <span className="num">#1</span>
            <span className="lbl">Dwarka Choice</span>
          </div>
        </div>
      </div>
    </section>
  );
};
