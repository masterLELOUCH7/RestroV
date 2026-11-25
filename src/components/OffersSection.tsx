import React from 'react';
import { Check, Copy, Sparkles } from 'lucide-react';
import { OFFERS } from '../data/restaurantData';

interface OffersSectionProps {
  appliedPromo: string | null;
  onApplyCode: (code: string) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({
  appliedPromo,
  onApplyCode,
}) => {
  return (
    <section id="offers" className="offers-section">
      <div className="container">
        <div className="eyebrow">
          <div className="eyebrow-line" />
          <span className="eyebrow-text">Smart Direct Incentives</span>
        </div>
        <h2 className="section-title">
          Direct-Order <em>Yield &amp; Festive Offers</em>
        </h2>
        <p className="section-sub">
          Click any promo code below to copy and instantly apply it to your cart. Ordering direct
          bypasses 25% food-app commissions — savings we share directly with you.
        </p>

        <div className="offers-grid">
          {OFFERS.map((offer) => {
            const isApplied = appliedPromo === offer.code;
            return (
              <div
                key={offer.code}
                className={`offer-card ${offer.featured ? 'featured' : ''}`}
              >
                {offer.ribbon && <div className="offer-ribbon">{offer.ribbon}</div>}
                <div className="offer-inner">
                  <div className="offer-top-row">
                    <span style={{ fontSize: 32 }}>{offer.icon}</span>
                    <span className="offer-model-tag">
                      <Sparkles size={10} style={{ display: 'inline', marginRight: 4 }} />
                      {offer.modelTag}
                    </span>
                  </div>
                  <span className="offer-pct">
                    {offer.pctPrefix && <span>{offer.pctPrefix}</span>}
                    {offer.pct}
                    {offer.pctSuffix && <span>{offer.pctSuffix}</span>}
                  </span>
                  <div className="offer-title">{offer.title}</div>
                  <div className="offer-desc">{offer.desc}</div>

                  <button
                    className="offer-code-btn"
                    onClick={() => onApplyCode(offer.code)}
                  >
                    <span className="offer-code-text">{offer.code}</span>
                    <span
                      style={{
                        fontSize: 11,
                        color: isApplied ? '#4ade80' : '#8c877e',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      {isApplied ? (
                        <>
                          <Check size={13} /> Applied to Cart
                        </>
                      ) : (
                        <>
                          <Copy size={12} /> Copy &amp; Apply
                        </>
                      )}
                    </span>
                  </button>

                  <div className="offer-validity">{offer.validity}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
